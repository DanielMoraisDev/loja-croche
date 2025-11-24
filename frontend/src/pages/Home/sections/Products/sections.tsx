import axios from "axios";
import { useEffect, useState } from "react";
import ProductInspect from "../ProductInspect/section";
import configs from "../../../../config";
import { ShoppingCart, Trash2 } from "lucide-react";
import useWindowSize from "../../../../utils/useWindowSize";
import Cookies from "universal-cookie";
import LoginRegister from "../LoginRegister/section";

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

const host = configs.hosts.backend_api.host;
const port = configs.hosts.backend_api.port;

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductInspectActive, setIsProductInspectActive] = useState(false);
  const [dataReceived, setDataReceived] = useState<Product[]>();
  const { width, height } = useWindowSize();
  const [widthReceived, setWidthReceived] = useState<number>(width);
  const cookies = new Cookies();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isLoginRegisterActive, setIsLoginRegisterActive] = useState(false);

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

  useEffect(() => {
    setWidthReceived(width);
  }, [width, height]);

  const getAllProducts = async () => {
    if (userToken) {
      await axios
      .get(`http://${host}:${port}/api/products/`, {
        headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      })
      .then(function (response) {
        setDataReceived(response.data);
      });
      return;
    }
    await axios
    .get(`http://${host}:${port}/api/products/`)
      .then(function (response) {
      setDataReceived(response.data);
    });
  };

  useEffect(() => {
    getAllProducts();
  }, [userToken]);

  useEffect(() => {
    console.log(dataReceived);
  }, [dataReceived]);

  const handleOpenProductInspect = (product: Product) => {
    setSelectedProduct(product);
    setIsProductInspectActive(true);
  };

  const handleCloseProductInspect = () => {
    setIsProductInspectActive(false);
    getAllProducts();
  };

  const handleAddOnCardItems = async (product: Product) => {
    if (!isLogged) return setIsLoginRegisterActive(true);

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

      getAllProducts();
    } catch (error: any) {
      console.log("Error ao tentar adicionar item ao carrinho");
    }
  };

  const handleCloseLoginRegister = () => {
    setIsLoginRegisterActive(false);
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

      getAllProducts();
    } catch (error: any) {
      console.log("Error ao tentar remover item ao carrinho");
    }
  };

  return (
    <>
    <div className="flex flex-col w-full  justify-start px-14 pb-20 bg-very_light_saturated_orange border-y-[3px] text-deep_orange border-deep_orange gap-5">
    <div className="flex flex-col pt-14 py-7">
    <p className="text-xl font-extrabold">Catalogo para encomendar:</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
    {dataReceived?.map((product) => (
      <div className="flex flex-col justify-between gap-3 p-4 h-full bg-white rounded-3xl border-[3px] border-deep_orange shadow-[0px_8px_0px_0px_rgba(215,_161,_109,_1)]">
      <div className="w-full aspect-square overflow-hidden rounded-2xl border-[3px] border-deep_orange bg-white flex items-center justify-center">
      <img
      className="w-full h-full object-cover"
      src={product.image_url}
      alt={product.name}
      />
      </div>
      <div className="h-max flex flex-col font-bold gap-6">
      <div>
      <p className="text-warm_peachy_orange text-sm ">
      {product.type}
      </p>
      <p className="text-deep_orange text-xl">{product.name}</p>
      <p className="text-warm_peachy_orange">R${product.price}</p>
      <p className="text-warm_peachy_orange">
      {product.addedInCart}
      </p>
      </div>
      <div className="flex flex-col 2xl:flex-row gap-2">
      <button
      onClick={() => handleOpenProductInspect(product)}
      className="relative rounded-xl py-3 px-3  w-full font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange"
      >
      <p className="text-lg">{"saiba mais".toUpperCase()}</p>
      </button>
      <button
      onClick={
        product?.addedInCart
          ? () => handleRemoveOfCardItems(product)
          : () => handleAddOnCardItems(product)
      }
      className={`flex flex-row gap-4 justify-center items-center rounded-xl p-2.5 2xl:p-3 font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange ${
        product?.addedInCart == true
          ? "text-white !bg-red-400 "
          : null
      }`}
      >
      {product?.addedInCart ? (
        <Trash2 size={32} />
      ) : (
      <ShoppingCart size={32} />
      )}
      <p
      className={`font-bold ${
        widthReceived <= 1536 ? "flex" : "hidden"
      }`}
      >
      {product?.addedInCart
        ? "Remover".toUpperCase()
        : "Adicionar".toUpperCase()}
        </p>
        </button>
        </div>
        </div>
        </div>
    ))}
    </div>
    </div>
    <ProductInspect
    data={selectedProduct || undefined}
    activate={isProductInspectActive}
    onClose={handleCloseProductInspect}
    userToken={userToken}
    />
    <LoginRegister
    activate={isLoginRegisterActive}
    onClose={handleCloseLoginRegister}
    />
    </>
  );
};

export default Products;
