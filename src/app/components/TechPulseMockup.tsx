import { MacbookMockup } from "./MacbookMockup";
import techpulseHome from "figma:asset/b8eadd8029212c9f8fd4af4b958fa28baf4de3cc.png";
import techpulseProduct from "figma:asset/1c2b386ba0465a951f2583c136c439d827c8f34b.png";
import techpulseCheckout from "figma:asset/2e7e96afb77cf7707fa8604424ef55f52867e326.png";

const screens = [
  {
    src: techpulseProduct,
    alt: "TechPulse - Detalhes do Produto",
    rotate: -14,
    translateX: -110,
    zIndex: 1,
    opacity: 0.65,
  },
  {
    src: techpulseHome,
    alt: "TechPulse - Home & Ofertas",
    rotate: 0,
    translateX: 0,
    zIndex: 3,
    opacity: 1,
  },
  {
    src: techpulseCheckout,
    alt: "TechPulse - Checkout",
    rotate: 14,
    translateX: 110,
    zIndex: 1,
    opacity: 0.65,
  },
];

export function TechPulseMockup() {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
      >
        {screens.map((screen, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-[220px] md:w-[340px] transition-transform duration-500 group-hover:scale-[1.03]"
            style={{
              transform: `translate(-50%, -50%) translateX(${screen.translateX}px) rotate(${screen.rotate}deg)`,
              zIndex: screen.zIndex,
              opacity: screen.opacity,
              transformOrigin: "center bottom",
            }}
          >
            <MacbookMockup>
              <img
                src={screen.src}
                alt={screen.alt}
                className="w-full h-auto object-cover"
                style={{ display: "block" }}
              />
            </MacbookMockup>
          </div>
        ))}
      </div>
    </div>
  );
}
