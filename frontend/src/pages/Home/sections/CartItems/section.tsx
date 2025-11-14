import { X } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

interface CartItemsProps {
  activate: boolean;
  onClose: () => void;
}

const CartItems: FC<CartItemsProps> = ({ activate, onClose }) => {
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

  useEffect(() => {}, []);

  return (
    <aside
      className={`h-screen max-sm:w-[360px] w-[560px] top-0 right-0 fixed z-[9999999] overflow-y-scroll
      bg-white border-x-[3px] border-deep_orange shadow-lg
      transition-transform duration-500 ease-in-out
      ${activate ? "translate-x-0" : "translate-x-full"}`}
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
          Na sua lista de desejos
        </h2>{" "}
      </div>
    </aside>
  );
};

export default CartItems;
