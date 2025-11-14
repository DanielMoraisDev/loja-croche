import logoPaleta from "../../../../assets/images/logo-header.svg";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import LoginRegister from "../LoginRegister/section";

const Header = () => {
  const cookies = new Cookies();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const token = cookies.get("jwt_authorization");
    if (token) {
      setUserToken(token);
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      setIsLogged(true);
    }
  }, [userToken]);

  const [isLoginRegisterActive, setIsLoginRegisterActive] = useState(false);

  const handleOpen = () => {
    setIsLoginRegisterActive(true);
  };

  const handleClose = () => {
    setIsLoginRegisterActive(false);
  };

  const logout = () => {
    cookies.remove("jwt_authorization");
    setUserToken(null);
    setIsLogged(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 w-full h-full items-center justify-between px-14 py-4 bg-soft_light_yellow ">
        <div className="w-[350px] flex flex-col items-center justify-center">
          <img className="w-full " src={logoPaleta} />
        </div>
        <div className="flex flex-row gap-6">
          <div className="flex flex-row gap-8">
            <button className="flex flex-row justify-center items-center rounded-xl  w-full font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange">
              <div className="flex flex-col bg-warm_peachy_orange p-2 rounded-lg">
                <ShoppingCart size={32} className="text-soft_fresh_green" />
              </div>
              <div className="w-full flex flex-row whitespace-nowrap px-3">
                <p className="text-lg">{"ver carrinho".toUpperCase()}</p>
              </div>
            </button>
            {isLogged ? (
              <button
                onClick={() => logout()}
                className="relative rounded-full px-9 p-2  font-bold border-red-600 bg-red-400  border-[3px]  text-white shadow-[0px_3px_0px_0px_rgba(220,38,38,1)] hover:shadow-[0px_1px_0px_0px_rgba(220,38,38,1)] active:shadow-[0px_0px_0px_0px_rgba(220,38,38,1)] hover:top-[1px] active:bg-red-500"
              >
                <p className="text-lg">{"sair".toUpperCase()}</p>
              </button>
            ) : (
              <button
                onClick={() => handleOpen()}
                className="relative rounded-full px-9 p-2  font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange"
              >
                <p className="text-lg">{"entrar".toUpperCase()}</p>
              </button>
            )}
          </div>
        </div>
      </div>
      {isLoginRegisterActive && (
        <LoginRegister activate={isLoginRegisterActive} onClose={handleClose} />
      )}
    </>
  );
};

export default Header;
