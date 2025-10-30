import { ShoppingCart, X } from "lucide-react";
import { type FC } from "react";

interface Product {
  id_product: string;
  name: string;
  price: string;
  size: string;
  type: string;
  image_url: string;
  image_object_name: string;
}

interface PopUpProps {
  data?: Product;
  activate: boolean;
  onClose: () => void;
}

const PopUp: FC<PopUpProps> = ({ data, activate, onClose }) => {
  return (
    <aside
      className={`min-h-[100vh] w-[360px] top-0 right-0 fixed z-[100] overflow-y-scroll max-h-[100vh]
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
            <div className="flex flex-col w-full gap-3">
              <button className="relative rounded-xl px-9 p-3 w-full font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange">
                <p className="text-lg">{"pedir agora".toUpperCase()}</p>
              </button>
              <button className="flex flex-row justify-center items-center rounded-xl  w-full font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange">
                <div className="flex flex-col bg-warm_peachy_orange p-3 rounded-lg">
                  <ShoppingCart size={32} className="text-soft_fresh_green" />
                </div>
                <div>
                  <p className="text-lg">
                    {"adicionar ao carrinho".toUpperCase()}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default PopUp;
