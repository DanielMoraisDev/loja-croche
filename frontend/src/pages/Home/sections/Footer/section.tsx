import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import logoFooter from "../../../../assets/images/logo-footer.svg";
import useWindowSize from "../../../../utils/useWindowSize";
import { useEffect, useState } from "react";

const Footer = () => {
  const { width, height } = useWindowSize();
  const [widthReceived, setWidthReceived] = useState<number>(width);

  useEffect(() => {
    setWidthReceived(width);
  }, [width, height]);
  return (
    <div className="px-16 xl:px-32 py-12 w-full flex flex-col xl:flex-row justify-between items-center gap-8 bg-soft_light_yellow text-deep_orange">
      <div className="flex w-full xl:items-center flex-col md:flex-row gap-8 md:gap-24">
        <div className="flex flex-col gap-4">
          <div className="w-[350px] xl:w-[500px] flex flex-col items-center justify-center">
            <img className="w-full " src={logoFooter} />
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-bold text-lg">Minhas outras lojinhas:</p>
            <p className="hover:text-warm_peachy_orange hover:cursor-pointer transition-colors duration-200">
              Pinturas à óleo e desenhos digitais
            </p>
            <p className="hover:text-warm_peachy_orange hover:cursor-pointer transition-colors duration-200">
              Sites super criativos
            </p>
          </div>
        </div>
        {width <= 1280 ? (
          <div className="flex w-full flex-col gap-3">
            <p className="font-bold text-lg">Categorias de crochê</p>
            <p>Chaveiros</p>
            <p>Bonecos</p>
            <p>Pulseiras</p>
            <p>Acessórios</p>
            <p>Capinhas</p>
          </div>
        ) : null}
      </div>
      <div className="flex w-full h-full flex-row gap-6">
        {widthReceived > 1280 ? (
          <div className="flex w-full flex-col gap-3">
            <p className="font-bold text-lg">Categorias de crochê</p>
            <p>Chaveiros</p>
            <p>Bonecos</p>
            <p>Pulseiras</p>
            <p>Acessórios</p>
            <p>Capinhas</p>
          </div>
        ) : null}
        <div className="flex w-full h-full flex-col gap-3">
          <p className="font-bold text-lg">Contatos</p>
          <p>82 98895 0899</p>
          <p className="hover:text-warm_peachy_orange hover:cursor-pointer transition-colors duration-200">
            Link WhatsApp
          </p>
          <p>Horário de atendimento: 13h às 22h</p>
          <div className="flex flex-row gap-3 mt-4">
            <button className="relative rounded-xl p-3 border-deep_orange bg-warm_peachy_orange text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange">
              <AiFillInstagram size={24} />
            </button>
            <button className="relative rounded-xl p-3 border-deep_orange bg-warm_peachy_orange text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange">
              <FaYoutube size={24} />
            </button>
            <button className="relative rounded-full px-3 p-2  font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[1px] active:bg-very_light_saturated_orange">
              <p className="text-lg">{"encomendar".toUpperCase()}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
