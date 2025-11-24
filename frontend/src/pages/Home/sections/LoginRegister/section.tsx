import { Eye, EyeOff, X } from "lucide-react";
import Cookies from "universal-cookie";
import { useState, type FC } from "react";
import axios from "axios";
import configs from "../../../../config";

const host = configs.hosts.backend_api.host;
const port = configs.hosts.backend_api.port;

interface LoginRegisterProps {
  activate: boolean;
  onClose: () => void;
}

const LoginRegister: FC<LoginRegisterProps> = ({ activate, onClose }) => {
  const cookies = new Cookies();
  type AuthState = "login" | "register";
  const [state, setState] = useState<AuthState>("register");
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [confirmPasswordShow, setConfirmPasswordShow] =
    useState<boolean>(false);

  const handleState = () => {
    if (state == "login") {
      setState("register");
      return;
    }

    setState("login");
  };

  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  type FormErrors = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    loginFail?: string;
  };

  const [errors, setErrors] = useState<FormErrors>({});

  const register = async () => {
    const newErrors: FormErrors = {};

    if (!name || name.trim() === "") {
      newErrors.name = "O nome é obrigatório.";
    }

    if (!email || email.trim() === "") {
      newErrors.email = "O e-mail é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Formato de e-mail inválido.";
    }

    if (!password || password.trim() === "") {
      newErrors.password = "A senha é obrigatória.";
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter no mínimo 6 caracteres.";
    }

    if (!confirmPassword || confirmPassword.trim() === "") {
      newErrors.confirmPassword = "A confirmação de senha é obrigatória.";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword =
        "A senha precisa ser igual a senha digitada anteriormente.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const response = await axios.post(`http://${host}:${port}/api/users`, {
      name,
    email,
    password,
    });

    const token = response.data?.token;

    if (token) {
      cookies.set("jwt_authorization", token);
      window.location.reload();
    }
  };

  const login = async () => {
    const newErrors: FormErrors = {};

    if (!email || email.trim() === "") {
      newErrors.email = "O e-mail é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Formato de e-mail inválido.";
    }

    if (!password || password.trim() === "") {
      newErrors.password = "A senha é obrigatória.";
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter no mínimo 6 caracteres.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await axios.post(
        `http://${host}:${port}/api/users/login`,
          { email, password }
      );

      const token = response.data?.token;

      if (token) {
        cookies.set("jwt_authorization", token);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Erro ao tentar entrar. Tente novamente.";

      newErrors.loginFail = msg;
      setErrors((prev) => ({
        ...prev,
        loginFail: msg,
      }));
    }
  };

  return (
    <div
    className={`fixed inset-0 z-20 bg-black/30 flex justify-center items-center
      transition-opacity duration-500 ${
        activate ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      >
      <aside
      className={`relative w-full max-w-[500px] bg-soft_light_yellow
        border-[3px] rounded-2xl border-deep_orange shadow-2xl
        transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${activate ? "translate-y-0 scale-100" : "translate-y-12 scale-95"}
        overflow-y-auto max-h-[90vh]`}
        >
        <div>
        <button
        type="button"
        onClick={onClose}
        className="absolute top-6 left-6 z-50 rounded-xl  p-2 flex font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[26px] active:bg-very_light_saturated_orange"
        >
        <X size={32} />
        </button>
        </div>

        <div className="z-40 absolute top-0 p-9 left-0 w-full justify-center">
        <h2 className="font-bold text-2xl text-center text-deep_orange ">
        {state == "login" ? "Entre na sua conta" : "Registre sua conta"}
        </h2>{" "}
        </div>

        {state == "login" ? (
          <div className="flex mt-24 flex-col items-center text-deep_orange gap-4 mb-12">
          <div className="w-full flex flex-col gap-4 p-4 px-8">
          <div className="flex flex-col gap-2">
          <label className="block text-md font-semibold text-heading">
          Email:
            </label>
          <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="focus:outline-none  border-4 text-heading text-md rounded-xl border-warm_peachy_orange focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Digite seu email..."
          required
          />
          <span
          className={`${
            errors.email ? "block" : "hidden"
          } text-sm text-red-500 text-heading`}
          >
          {errors.email}
          </span>
          </div>
          <div className="flex flex-col gap-2">
          <label className="block text-md font-semibold text-heading">
          Senha:
            </label>
          <div className="w-full relative">
          {passwordShow ? (
            <EyeOff
            onClick={() => setPasswordShow(!passwordShow)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer "
            />
          ) : (
          <Eye
          onClick={() => setPasswordShow(!passwordShow)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer "
          />
          )}
          <input
          type={passwordShow ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          className="focus:outline-none  border-4 text-heading text-md rounded-xl border-warm_peachy_orange focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Digite sua senha..."
          required
          />
          </div>
          <span
          className={`${
            errors.password ? "block" : "hidden"
          } text-sm text-red-500 text-heading`}
          >
          {errors.password}
          </span>
          </div>
          </div>

          <span
          className={`${
            errors.loginFail ? "block" : "hidden"
          } text-sm text-red-500 text-heading`}
          >
          {errors.loginFail}
          </span>

          <button
          onClick={() => login()}
          className="relative rounded-full px-9 p-3.5 font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange"
          >
          <p className="text-lg">{"entrar na conta".toUpperCase()}</p>
          </button>
          <p>
          Ainda não possui uma conta?{" "}
          <a
          onClick={() => handleState()}
          className="text-md font-bold hover:text-warm_peachy_orange hover:cursor-pointer transition-colors duration-200"
          >
          Registrar-se agora
          </a>
          </p>
          </div>
        ) : (
        <div className="flex mt-24 flex-col items-center text-deep_orange gap-4 mb-12">
        <div className="w-full flex flex-col gap-4 p-4 px-8">
        <div className="flex flex-col gap-2">
        <label className="block text-md font-semibold text-heading">
        Nome:
          </label>
        <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        className="focus:outline-none  border-4 text-heading text-md rounded-xl border-warm_peachy_orange focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        placeholder="Digite seu nome..."
        required
        />
        <span
        className={`${
          errors.name ? "block" : "hidden"
        } text-sm text-red-500 text-heading`}
        >
        {errors.name}
        </span>
        </div>
        <div className="flex flex-col gap-2">
        <label className="block text-md font-semibold text-heading">
        Email:
          </label>
        <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className="focus:outline-none  border-4 text-heading text-md rounded-xl border-warm_peachy_orange focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        placeholder="Digite seu email..."
        required
        />
        <span
        className={`${
          errors.email ? "block" : "hidden"
        } text-sm text-red-500 text-heading`}
        >
        {errors.email}
        </span>
        </div>
        <div className="flex flex-col gap-2">
        <label className="block text-md font-semibold text-heading">
        Senha:
          </label>
        <div className="w-full relative">
        {passwordShow ? (
          <EyeOff
          onClick={() => setPasswordShow(!passwordShow)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer "
          />
        ) : (
        <Eye
        onClick={() => setPasswordShow(!passwordShow)}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer "
        />
        )}
        <input
        type={passwordShow ? "text" : "password"}
        onChange={(e) => setPassword(e.target.value)}
        className="focus:outline-none  border-4 text-heading text-md rounded-xl border-warm_peachy_orange focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        placeholder="Digite sua senha..."
        required
        />
        </div>
        <span
        className={`${
          errors.password ? "block" : "hidden"
        } text-sm text-red-500 text-heading`}
        >
        {errors.password}
        </span>
        </div>
        <div className="flex flex-col gap-2">
        <label className="block text-md font-semibold text-heading">
        Confirme sua senha:
          </label>
        <div className="w-full relative">
        {confirmPasswordShow ? (
          <EyeOff
          onClick={() =>
            setConfirmPasswordShow(!confirmPasswordShow)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer "
          />
        ) : (
        <Eye
        onClick={() =>
          setConfirmPasswordShow(!confirmPasswordShow)
        }
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer "
        />
        )}
        <input
        type={confirmPasswordShow ? "text" : "password"}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="focus:outline-none  border-4 text-heading text-md rounded-xl border-warm_peachy_orange focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        placeholder="Digite novamente a mesma senha..."
        required
        />
        </div>
        <span
        className={`${
          errors.confirmPassword ? "block" : "hidden"
        } text-sm text-red-500 text-heading`}
        >
        {errors.confirmPassword}
        </span>
        </div>
        </div>
        <button
        onClick={() => register()}
        className="relative rounded-full px-9 p-3.5  font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange"
        >
        <p className="text-lg">{"registrar conta".toUpperCase()}</p>
        </button>
        <p>
        Já possui uma conta?{" "}
        <a
        onClick={() => handleState()}
        className="text-md font-bold hover:text-warm_peachy_orange hover:cursor-pointer transition-colors duration-200"
        >
        Entrar agora
        </a>
        </p>
        </div>
        )}
        </aside>
        </div>
  );
};

export default LoginRegister;
