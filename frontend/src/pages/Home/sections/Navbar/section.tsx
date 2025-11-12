import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import whitePataImg from "../../../../assets/images/pata-white.svg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
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
    </>
  );
};

export default Navbar;
