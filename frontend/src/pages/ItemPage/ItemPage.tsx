import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const host = import.meta.env.VITE_BACKEND_HOST;
const port = import.meta.env.VITE_BACKEND_PORT;

interface Product {
  id_product: string;
  name: string;
  image_url: string;
  image_object_name: string;
}

const Home = () => {
  const params = useParams<{ id: string }>();

  const [dataReceived, setDataReceived] = useState<Product>();
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`http://${host}:${port}/api/products/${params.id}`)
        .then(function (response) {
          setDataReceived(response.data);
        });
    }, 1500);
  }, []);

  if (!dataReceived) {
    return <div className="text-black p-5">Carregando produto...</div>;
  }

  return (
    <div className="flex flex-col gap-2 text-black p-5 bg-slate-500 rounded-lg">
      <div className="h-32 w-32">
        <img
          className="h-32 w-32 object-cover rounded-md"
          src={dataReceived.image_url}
          alt={dataReceived.name}
        />
      </div>
      <div>
        <span className="text-sm opacity-80">{dataReceived.id_product}</span>
        <p className="text-lg font-semibold">{dataReceived.name}</p>
      </div>
    </div>
  );
};

export default Home;
