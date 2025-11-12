import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState, type FC } from "react";

interface LoginRegisterProps {
  activate: boolean;
  onClose: () => void;
}

const LoginRegister: FC<LoginRegisterProps> = ({ activate, onClose }) => {
  const [show, setShow] = useState(activate);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (activate) {
      setShow(true);
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    }
  }, [activate]);

  if (!show) return null;

  return (
    <aside
      className={`fixed inset-0 m-auto max-w-[600px] max-h-[700px] z-20
        bg-white border-[3px] rounded-2xl border-deep_orange shadow-2xl
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${
          visible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-full opacity-0 scale-95"
        }`}
    >
      <button
        type="button"
        onClick={onClose}
        className="rounded-xl p-2 absolute top-3 left-3 font-bold border-deep_orange bg-soft_fresh_green text-deep_orange border-[3px] shadow-[0px_3px_0px_0px_rgba(176,_99,_56,_1)] hover:shadow-[0px_1px_0px_0px_rgba(176,_99,_56,_1)] active:shadow-[0px_0px_0px_0px_rgba(176,_99,_56,_1)] hover:top-[14px] active:bg-very_light_saturated_orange"
      >
        <X size={32} />
      </button>

      <div className="flex flex-col items-center text-deep_orange">
        <div className="w-full flex flex-col gap-4 p-4 px-8">
          <div className="flex flex-col gap-1 w-full ">
            <p className="text-warm_peachy_orange text-sm mb-1 font-bold">
              TESTE
            </p>
            <h2 className="text-2xl font-extrabold">TESTE</h2>
            <p className="text-warm_peachy_orange mb-2">Tamanho: 23131</p>
            <p className="text-warm_peachy_orange mb-2">Preço: </p>
            <p className="text-deep_orange text-2xl font-bold">R$ 12.00</p>
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
    </aside>
  );
};

export default LoginRegister;
