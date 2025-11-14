import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import useWindowSize from "../../../../utils/useWindowSize";
import axios from "axios";
import configs from "../../../../config";

interface Product {
  id_product: string;
  name: string;
  price: string;
  size: string;
  type: string;
  image_url: string;
  image_object_name: string;
  addedInCart: boolean;
}

interface ProductInspectProps {
  data?: Product;
  activate: boolean;
  onClose: () => void;
  userToken: string | null;
}

const host = configs.hosts.backend_api.host;
const port = configs.hosts.backend_api.port;

const ProductInspect: FC<ProductInspectProps> = ({
  data,
  activate,
  onClose,
  userToken,
}) => {
  const { width, height } = useWindowSize();
  const [widthReceived, setWidthReceived] = useState<number>(width);
  useEffect(() => {
    setWidthReceived(width);
  }, [width, height]);

  const handleAddOnCardItems = async (product: Product) => {
    try {
      await axios.post(
        `http://${host}:${port}/api/cart_item`,
        {
          id_product: product.id_product,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error: any) {
      console.log("Error ao tentar adicionar item ao carrinho");
    }
  };

  const handleRemoveOfCardItems = async (product: Product) => {
    try {
      await axios.delete(
        `http://${host}:${port}/api/cart_item/${product.id_product}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error: any) {
      console.log("Error ao tentar remover item ao carrinho");
    }
  };
  return (
    <aside
      className={`h-screen w-[360px] top-0 right-0 fixed z-10 overflow-y-scroll
      bg-white border-x-[3px] border-deep_orange shadow-lg
      transition-transform duration-500 ease-in-out
      ${activate ? "translate-x-0" : "translate-x-full"}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="rounded-xl p-2 absolute top-3 left-3 font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[14px] active:bg-very_light_saturated_orange"
      >
        <X size={32} />
      </button>

      {data && (
        <div className="flex flex-col items-center text-deep_orange">
          <img
            src={data.image_url}
            alt={data.name}
            className="w-full border-b-[3px] border-deep_orange"
          />
          <div className="w-full flex flex-col gap-4 p-4 px-8">
            <div className="flex flex-col gap-1 w-full ">
              <p className="text-warm_peachy_orange text-sm mb-1 font-bold">
                {data.type}
              </p>
              <h2 className="text-2xl font-extrabold">{data.name}</h2>
              <p className="text-warm_peachy_orange mb-2">
                Tamanho: {data.size}
              </p>
              <p className="text-warm_peachy_orange mb-2">Preço: </p>
              <p className="text-deep_orange text-2xl font-bold">
                R$ {data.price}
              </p>
            </div>
            <div className="flex flex-col 2xl:flex-row gap-2">
              <button className="relative rounded-xl py-3 px-3  w-full font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange">
                <p className="text-lg">{"pedir agora".toUpperCase()}</p>
              </button>
              <button
                onClick={
                  data?.addedInCart
                    ? () => handleRemoveOfCardItems(data)
                    : () => handleAddOnCardItems(data)
                }
                className="flex flex-row gap-4 justify-center items-center rounded-xl p-2.5 2xl:p-3 font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange"
              >
                <ShoppingCart size={32} />
                <p
                  className={`font-bold ${
                    widthReceived <= 1536 ? "flex" : "hidden"
                  }`}
                >
                  {"Adicionar".toUpperCase()}
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default ProductInspect;
