import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const host = import.meta.env.VITE_BACKEND_HOST;
const port = import.meta.env.VITE_BACKEND_PORT;

interface Product {
  id_product: string;
  name: string;
  image_url: string;
  image_object_name: string;
}

const Home = () => {
  const [dataReceived, setDataReceived] = useState<Product[]>();
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`http://${host}:${port}/api/products/`)
        .then(function (response) {
          setDataReceived(response.data);
        });
    }, 1000);
  }, []);

  if (!dataReceived) {
    return <div className="text-black p-5">Carregando produto...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {dataReceived.map((product) => (
        <Link to={`/item/${product.id_product}`}>
          <div className="text-black p-5 bg-slate-500">
            <div className="h-32 w-32">
              <img className="h-32 w-32" src={product.image_url} alt="" />
            </div>
            <div>
              <span>{product.id_product}</span>
              <p>{product.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
