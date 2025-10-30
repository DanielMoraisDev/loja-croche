import axios from "axios";
import { useEffect, useState } from "react";
import PopUp from "../PopUp/section";
import configs from "../../../../config";
import { ShoppingCart } from "lucide-react";

interface Product {
  id_product: string;
  name: string;
  price: string;
  size: string;
  type: string;
  image_url: string;
  image_object_name: string;
}

const host = configs.hosts.backend_api.host;
const port = configs.hosts.backend_api.port;

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [dataReceived, setDataReceived] = useState<Product[]>();
  useEffect(() => {
    axios.get(`http://${host}:${port}/api/products/`).then(function (response) {
      setDataReceived(response.data);
    });
  }, []);

  const handleOpen = (product: Product) => {
    setSelectedProduct(product);
    setIsPopupActive(true);
  };

  const handleClose = () => {
    setIsPopupActive(false);
  };

  return (
    <>
      <div className="flex flex-col w-full  justify-start px-14 pb-20 bg-very_light_saturated_orange border-y-[3px] text-deep_orange border-deep_orange gap-5">
        <div className="flex flex-col pt-14 py-7">
          <p className="text-xl font-extrabold">Catalogo para encomendar:</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {dataReceived?.map((product) => (
            <div className="flex flex-col justify-between gap-3 p-4 h-[420px]  bg-white rounded-3xl border-[3px] border-deep_orange shadow-[0px_8px_0px_0px_rgba(215,_161,_109,_1)]">
              <div className="w-full aspect-square overflow-hidden rounded-2xl border-[3px] border-deep_orange bg-white flex items-center justify-center">
                <img
                  className="w-full h-full object-cover"
                  src={product.image_url}
                  alt={product.name}
                />
              </div>
              <div className="h-[50%] flex flex-col font-bold gap-6">
                <div>
                  <p className="text-warm_peachy_orange text-sm ">
                    {product.type}
                  </p>
                  <p className="text-deep_orange text-xl">{product.name}</p>
                  <p className="text-warm_peachy_orange">R${product.price}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => handleOpen(product)}
                    className="relative rounded-xl py-3 px-3  w-full font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange"
                  >
                    <p className="text-lg">{"saiba mais".toUpperCase()}</p>
                  </button>
                  <button className="relative rounded-xl p-3 font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange">
                    <ShoppingCart size={32} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PopUp
        data={selectedProduct || undefined}
        activate={isPopupActive}
        onClose={handleClose}
      />
    </>
  );
};

export default Products;
