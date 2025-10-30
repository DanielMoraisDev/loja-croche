import { useEffect, useRef, useState } from "react";
import whitePataImg from "../../../../assets/images/pata-white.svg";

const Navbar = () => {
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStuck(!entry.isIntersecting);
      },
      { threshold: [1] }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div ref={sentinelRef} className="h-[1px]" />

      <div
        className={`sticky top-0 z-50 transition-all duration-500 ease-in-out 
        ${
          stuck
            ? "border-t-[3px] bg-warm_peachy_orange"
            : "border-t-[3px] border-deep_orange bg-warm_peachy_orange"
        } border-b-[3px] border-deep_orange`}
      >
        {/* Navbar mobile */}
        <div className="sm:hidden fixed top-0 left-0 w-full bg-warm_peachy_orange border-b-[3px] border-deep_orange z-50 flex items-center justify-start px-6 py-4">
          <img
            src={whitePataImg}
            alt="Logo Pata Branca"
            className="w-[28px] transition-all duration-300 ease-in-out"
          />
        </div>

        {/* Navbar desktop */}
        <div
          className={`hidden sm:flex sticky top-0 z-50 transition-all duration-500 ease-in-out 
  ${
    stuck
      ? "border-t-[3px] bg-warm_peachy_orange"
      : "border-t-[3px] border-deep_orange bg-warm_peachy_orange"
  } border-b-[3px] border-deep_orange`}
        >
          <div className="flex flex-row w-full items-center justify-start px-14 py-5 gap-5">
            <div
              className={`flex items-center justify-center transition-all duration-300 ease-in-out hover:rotate-[34deg] hover:scale-125 cursor-pointer ${
                stuck ? "scale-150" : "scale-100"
              }`}
            >
              <img
                className="w-[28px] transition-all duration-300 ease-in-out"
                src={whitePataImg}
                alt="Logo Pata Branca"
              />
            </div>

            <div className="text-soft_light_yellow font-bold text-lg flex flex-row gap-5">
              {["catálogo", "informações"].map((item, i) => (
                <p
                  key={i}
                  className="hover:text-soft_fresh_green hover:cursor-pointer transition-colors duration-200"
                >
                  {item.toUpperCase()}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
