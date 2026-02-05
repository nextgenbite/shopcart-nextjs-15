"use client";
import { TextAlignStart } from "lucide-react";
import SideBar from "./SideBar";
import React ,{ useState } from "react";

const MobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div>
      <button className="w-5 h-5 md:hidden hover:text-darkColor hoverEffect hover: cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <TextAlignStart />
      </button>
      <div className="md:hidden">

       <SideBar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </div>
    </div>
  );
};

export default MobileMenu;
