import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import logoPaleta from "../../../../assets/images/logo-header.svg";

const Navbar = () => {
  return (
    <>
      <div className="flex flex-row w-full h-full items-center justify-between px-14 py-4 bg-soft_light_yellow ">
        <div className="w-[350px] flex flex-col items-center justify-center">
          <img className="w-full " src={logoPaleta} />
        </div>
        <div className="flex flex-row gap-6">
          <button className="relative rounded-xl p-3 border-deep_orange bg-warm_peachy_orange text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange">
            <AiFillInstagram size={24} />
          </button>
          <button className="relative rounded-xl p-3 border-deep_orange bg-warm_peachy_orange text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange">
            <FaYoutube size={24} />
          </button>
          <button className="relative rounded-xl px-4 p-2 border-deep_orange bg-warm_peachy_orange text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange">
            <p className="text-lg">{"encomendar".toUpperCase()}</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
