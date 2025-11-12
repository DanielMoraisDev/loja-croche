import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import whitePataImg from "../../../../assets/images/pata-white.svg";
import { ShoppingCart } from "lucide-react";
import LoginRegister from "../LoginRegister/section";

const Navbar = () => {
  const [isLoginRegisterActive, setIsLoginRegisterActive] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setIsLoginRegisterActive(true);
  };

  const handleClose = () => {
    setIsLoginRegisterActive(false);
  };

  return (
    <>
      <div className="sticky top-0 z-10 border-t-[3px] border-b-[3px] border-deep_orange bg-warm_peachy_orange transition-all duration-500 ease-in-out">
        <div className="hidden sm:flex flex-row justify-between py-5 items-center px-14">
          <div className="hidden sm:flex flex-row w-full items-center justify-start gap-5">
            <div className="flex items-center justify-center transition-all duration-300 ease-in-out hover:rotate-[34deg] hover:scale-125 cursor-pointer scale-150">
              <img
                className="w-[28px] transition-all duration-300 ease-in-out"
                src={whitePataImg}
                alt="Logo Pata Branca"
              />
            </div>

            <div className="text-soft_light_yellow font-bold text-lg flex flex-row gap-5">
              {["catálogo", "informações"].map((item, i) => (
                <p
                  key={i}
                  className="hover:text-soft_fresh_green hover:cursor-pointer transition-colors duration-200"
                >
                  {item.toUpperCase()}
                </p>
              ))}
            </div>
          </div>
          <div className="hidden sm:flex flex-row gap-8">
            <button className="flex flex-row justify-center items-center rounded-xl  w-full font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange">
              <div className="flex flex-col bg-warm_peachy_orange p-2 rounded-lg">
                <ShoppingCart size={32} className="text-soft_fresh_green" />
              </div>
              <div className="w-full flex flex-row whitespace-nowrap px-3">
                <p className="text-lg">{"ver carrinho".toUpperCase()}</p>
              </div>
            </button>
            <button
              onClick={() => handleOpen()}
              className="relative rounded-full px-9 p-2  font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange"
            >
              <p className="text-lg">{"entrar".toUpperCase()}</p>
            </button>
          </div>
        </div>

        <div className="flex sm:hidden items-center justify-between px-5 py-4">
          <img src={whitePataImg} alt="Logo Pata Branca" className="w-7" />
          <button
            onClick={() => setOpen(!open)}
            className="text-soft_light_yellow text-2xl"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {open && (
          <div
            className="absolute left-0 top-full w-full sm:hidden 
               bg-warm_peachy_orange text-soft_light_yellow font-bold 
               flex flex-col items-start gap-3 px-5 py-4 border-y-[3px] border-deep_orange"
          >
            <div className="flex sm:hidden flex-row gap-8">
              <button className="flex flex-row justify-center items-center rounded-xl  w-full font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange">
                <div className="flex flex-col bg-warm_peachy_orange p-2 rounded-lg">
                  <ShoppingCart size={32} className="text-soft_fresh_green" />
                </div>
                <div className="w-full flex flex-row whitespace-nowrap px-3">
                  <p className="text-lg">{"ver carrinho".toUpperCase()}</p>
                </div>
              </button>
              <button
                onClick={() => handleOpen()}
                className="relative rounded-full px-9 p-2  font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange"
              >
                <p className="text-lg">{"entrar".toUpperCase()}</p>
              </button>
            </div>
            {["catálogo", "informações"].map((item, i) => (
              <p
                key={i}
                className="hover:text-soft_fresh_green hover:cursor-pointer transition-colors duration-200"
              >
                {item.toUpperCase()}
              </p>
            ))}
          </div>
        )}
      </div>

      <LoginRegister activate={isLoginRegisterActive} onClose={handleClose} />
    </>
  );
};

export default Navbar;
