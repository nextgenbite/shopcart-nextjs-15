import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartIconBtn = () => {
  return (
    <div>
      <Link href="/cart" className=" relative group">
        <ShoppingBag className="w-5 h-5 group-hover:text-shop_light_green hoverEffect" />
        <span className=" absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-shop_dark_green text-white text-xs flex items-center justify-center">
          0
        </span>
      </Link>
    </div>
  );
};

export default CartIconBtn;
