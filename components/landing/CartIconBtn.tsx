import { useCartStore } from "@/stores/cartStore";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartIconBtn = () => {
    const { cart } = useCartStore();
  return (
    <div>
   
          <Link href={"/cart"} className="group relative">
      <ShoppingBag className="w-5 h-5 hover:text-shop_light_green hoverEffect" />
      <span className="absolute -top-1 -right-3 bg-shop_dark_green text-white h-4.5 w-4.5 p-1.5 rounded-full text-xs font-semibold flex items-center justify-center">
        {cart?.item_count ?? 0}
      </span>
    </Link>
    </div>
  );
};

export default CartIconBtn;
