import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState, type FC } from "react";

interface LoginRegisterProps {
  activate: boolean;
  onClose: () => void;
}

const LoginRegister: FC<LoginRegisterProps> = ({ activate, onClose }) => {
  const [show, setShow] = useState(activate);
  const [visible, setVisible] = useState(false);
  type AuthState = "login" | "register";
  const [state, setState] = useState<AuthState>("login");

  const handleState = () => {
    if (state == "login") {
      setState("register");
      return;
    }

    setState("login");
  };

  useEffect(() => {
    if (activate) {
      setShow(true);
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    }
  }, [activate]);

  if (!show) return null;

  return (
    <aside
      className={`fixed inset-0 m-auto max-w-[500px] ${
        state == "login" ? "max-h-[460px]" : "max-h-[520px]"
      } z-20
        bg-soft_light_yellow border-[3px] rounded-2xl border-deep_orange shadow-2xl
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${
          visible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-full opacity-0 scale-95"
        }`}
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
        <div className="flex mt-24 flex-col items-center text-deep_orange gap-4">
          <div className="w-full flex flex-col gap-4 p-4 px-8">
            <div className="flex flex-col gap-2">
              <label className="block text-md font-semibold text-heading">
                Email:
              </label>
              <input
                type="text"
                className="focus:outline-none  border-4 text-heading text-md rounded-xl border-warm_peachy_orange focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Digite seu email..."
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-md font-semibold text-heading">
                Senha:
              </label>
              <input
                type="text"
                className="focus:outline-none  border-4 text-heading text-md rounded-xl border-warm_peachy_orange focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Digite sua senha..."
                required
              />
            </div>
          </div>
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
        <div className="flex mt-24 flex-col items-center text-deep_orange gap-4">
          <div className="w-full flex flex-col gap-4 p-4 px-8">
            <div className="flex flex-col gap-2">
              <label className="block text-md font-semibold text-heading">
                Nome:
              </label>
              <input
                type="text"
                className="focus:outline-none  border-4 text-heading text-md rounded-xl border-warm_peachy_orange focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Digite seu nome..."
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-md font-semibold text-heading">
                Email:
              </label>
              <input
                type="text"
                className="focus:outline-none  border-4 text-heading text-md rounded-xl border-warm_peachy_orange focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Digite seu email..."
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-md font-semibold text-heading">
                Senha:
              </label>
              <input
                type="text"
                className="focus:outline-none  border-4 text-heading text-md rounded-xl border-warm_peachy_orange focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Digite sua senha..."
                required
              />
            </div>
          </div>
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
  );
};

export default LoginRegister;
