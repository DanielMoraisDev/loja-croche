import { Gift, Package, Truck } from "lucide-react";
import sponsoredImage from "../../../../assets/images/announcment.png";
import { FaPix } from "react-icons/fa6";

const Sponsored = () => {
  const entregas = [
    {
      title: "Entrega Presencial",
      subtitle: "GRÁTIS e exclusiva para estudantes do SESI EBEP",
      icon: <Package size={32} />,
    },
    {
      title: "Presentei Alguem!",
      subtitle: "Ganhe desconto de 15% para chaveiros combinando.",
      icon: <Gift size={32} />,
    },
    {
      title: "Tipo de pagamento",
      subtitle: "Apenas PIX e dinheiro. Parcelas mínimas de R$45,00",
      icon: <FaPix size={32} />,
    },
    {
      title: "Entrega delivery",
      subtitle: "Frente variante, feito apenas em Maceió",
      icon: <Truck size={32} />,
    },
  ];

  return (
    <div className="max-sm:px-8 md:px-16 lg:px-32 py-12 w-full flex flex-col justify-center items-center gap-8 bg-soft_light_yellow">
      <div className="w-full rounded-3xl border-[4px]  border-deep_orange overflow-hidden">
        <img
          className="w-full h-auto block"
          src={sponsoredImage}
          alt="Banner da rifa Circus Baby"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
        {entregas.map((item, index) => (
          <div
            key={index}
            className="flex flex-row px-6 py-4 bg-soft_fresh_green gap-4 rounded-xl hover:cursor-pointer
                     shadow-[0_3px_0_0_rgba(176,99,56,1)] border-[3px] border-deep_orange
                     transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_5px_0_0_rgba(176,99,56,1)]"
          >
            <div
              className="bg-very_light_saturated_orange text-deep_orange border-[3px] 
             border-deep_orange rounded-full flex justify-center items-center 
             w-12 aspect-square overflow-hidden shrink-0 p-8"
            >
              <div className="text-xl ">{item.icon}</div>
            </div>
            <div className="flex flex-col gap-1 text-deep_orange">
              <p className="text-base font-bold">{item.title}</p>
              <p className="text-sm leading-tight">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsored;
