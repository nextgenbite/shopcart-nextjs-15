import Logo from "@/components/landing/Logo";
import { headerMenuLinks } from "@/constants/data";
import { X, Youtube } from "lucide-react";
import Link from "next/link";
import {  usePathname } from "next/navigation";
import { FC } from "react";
import SocialMediaBtn from "./SocialMediaBtn";
import { useOutsideClick } from "@/hooks";
interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}
const SideBar: FC<SideBarProps> = ({ isOpen, onClose }) => {
  const pathName = usePathname()
   const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div
      className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 text-white/70 shadow-xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } hoverEffect`}
    >
      <div
        ref={sidebarRef}
        className="min-w-72 max-w-96 bg-black h-screen p-10 border-r border-r-shop_light_green flex flex-col gap-6"
      >
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" spanDesign="group-hover:text-white" />
          <button title="close" type="button"
            onClick={onClose}
            className="hover:text-shop_light_green hoverEffect"
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerMenuLinks?.map((item) => (
            <Link
              href={item?.href}
              key={item?.name}
              className={`hover:text-shop_light_green hoverEffect ${
                pathName === item?.href && "text-white"
              }`}
            >
              {item?.name}
            </Link>
          ))}
        </div>
        <SocialMediaBtn />
      </div>
    </div>
  );
};

export default SideBar;
