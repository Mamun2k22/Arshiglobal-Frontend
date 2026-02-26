import { FaEnvelope, FaMapMarkerAlt, FaSignInAlt } from "react-icons/fa";

export default function TopContactBar() {
  return (
    <div className="h-[38px] bg-[#0b0f14] text-white/85">
      <div className="mx-auto max-w-7xl px-4 h-full flex items-center justify-between">
        {/* left */}
        <div className="flex items-center gap-4 text-[12px]">
          <span className="flex items-center gap-2">
            <FaEnvelope className="text-white/70" />
            arshitraveldhaka@gmail.com
          </span>
          <span className="hidden sm:inline text-white/25">|</span>
          <span className="hidden sm:flex items-center gap-2">
            <FaMapMarkerAlt className="text-white/70" />
            BNS Center, Uttara, Sector-07, Dhaka
          </span>
        </div>

        {/* right */}
        <div className="flex items-center gap-2 text-[12px]">
          <FaSignInAlt className="text-white/70" />
          <span>Sign In</span>
        </div>
      </div>
    </div>
  );
}