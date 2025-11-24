import { X } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import configs from "../../../../config";

const host = configs.hosts.backend_api.host;
const port = configs.hosts.backend_api.port;

interface CartItemsProps {
  activate: boolean;
  onClose: () => void;
}

interface CartItemRaw {
  id_product: string;
} 

interface CartItem {
  id_product: string;
  name: string;
  price: string;
  size: string;
  type: string;
  image_url: string;
  image_object_name: string;
}

const CartItems: FC<CartItemsProps> = ({ activate, onClose }) => {
  const cookies = new Cookies();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [dataReceived, setDataReceived] = useState<CartItem[]>([])
  const [rawDataReceived, setRawDataReceived] = useState<CartItemRaw[]>([])

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

  const getAllCartItems = async () => {
    if (dataReceived.length === 0) {
      const response = await axios
      .get(`http://${host}:${port}/api/cart_item/`, {
        headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      })
      setRawDataReceived(response.data.cardItem);

      const items = response.data.cardItem

      const products: CartItem[] = []
      const responses = await Promise.all(items.map((e: CartItemRaw) => axios.get(`http://${host}:${port}/api/products/${e.id_product}`)))
        responses.forEach((r) => products.push(r.data))

      setDataReceived(products)
    } 
  }

  useEffect(() => {
    if (isLogged){
      getAllCartItems()
    }
  }, [isLogged])

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

      <div className="mt-[120px] px-7 flex flex-col gap-4">
      {dataReceived.map((e, i) => (
        <div className="bg-very_light_saturated_orange p-4 rounded-xl border-[3px] border-deep_orange" key={i}>
        {e.id_product}
        </div>
      ))}
      </div>
      </aside>
  );
};

export default CartItems;
