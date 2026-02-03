import Logo from "@/components/ui/landing/logo";
import { headerMenuLinks } from "@/constants/data";
import { X, Youtube } from "lucide-react";
import Link from "next/link";
import {  usePathname } from "next/navigation";
import { FC, use } from "react";
import SocialMediaBtn from "./SocialMediaBtn";
interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}
const SideBar: FC<SideBarProps> = ({ isOpen, onClose }) => {
  const pathName = usePathname()
  return (
    <div>
      <div
        className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 text-white/80 backdrop-blur-md hoverEffect ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        onClick={onClose}
      >
        <div
          className="min-w-72 max-w-96 bg-black z-50 h-screen text-primary-foreground p-10 border-r border-r-shop_dark_green flex flex-col gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <Logo className=" text-white" spanDesign="group-hover:text-white" />
            <button
              onClick={onClose}
              className="hover:text-shop_dark_green hoverEffect"
            >
              <X />
            </button>
          </div>
          <div className="flex flex-col gap-3.5 text-base font-semibold tracking-wide text-zinc-400 bg-black">
            {headerMenuLinks.map((link) => (
              <Link
                key={link.name}
                className={`hover:text-shop_light_green hoverEffect ${pathName === link.href && "text-shop_light_green"}`}
                href={link.href}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <SocialMediaBtn />
    
        </div>
      </div>
    </div>
  );
};

export default SideBar;
