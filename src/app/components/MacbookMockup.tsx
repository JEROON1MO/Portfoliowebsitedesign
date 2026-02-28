import { ReactNode } from "react";

export function MacbookMockup({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-[92%] mt-4 mb-2">
      {/* Screen bezel */}
      <div className="relative rounded-t-xl bg-[#1a1a1a] border border-[#333] p-[6px] pt-[20px] shadow-2xl">
        {/* Camera dot */}
        <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-[#333] border border-[#444]" />
        {/* Screen content */}
        <div className="relative rounded-[4px] overflow-hidden bg-black">
          {children}
        </div>
      </div>
      {/* Keyboard base */}
      <div className="relative">
        <div className="h-[12px] bg-gradient-to-b from-[#2a2a2a] to-[#1f1f1f] rounded-b-lg border-x border-b border-[#333]" />
        {/* Bottom lip */}
        <div className="mx-auto w-[38%] h-[4px] bg-[#252525] rounded-b-lg border-x border-b border-[#333]" />
      </div>
    </div>
  );
}
