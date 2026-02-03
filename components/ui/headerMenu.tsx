"use client";
import { headerMenuLinks } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderMenu = () => {
    const pathName = usePathname();
  return (
    <div className="hidden md:inline-flex font-semibold text-sm items-center gap-7 capitalize text-lightColor">
      {headerMenuLinks.map((link) => (
        <Link
          className={`hover:text-shop_light_green hoverEffect relative group ${
            pathName === link.href && "text-shop_light_green" 
          }`}
          key={link.name}
          href={link.href}
        >
          {link.name}
          <span className={`h-0.5 absolute bg-shop_light_green bottom-0 left-1/2 w-0 group-hover:w-1/2 group-hover:left-0 hoverEffect ${pathName === link.href && "w-1/2 left-0" }`}></span>
          <span className={`h-0.5 absolute bg-shop_light_green bottom-0 right-1/2 w-0 group-hover:w-1/2 group-hover:right-0 hoverEffect ${pathName === link.href && "w-1/2 right-0"}`}></span>
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
