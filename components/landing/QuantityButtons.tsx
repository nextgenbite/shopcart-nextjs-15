import { Product } from "@/types/active_ecommerce_json";
import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
  className?: string;
}
const QuantityButtons = ({ product, className }: Props) => {
  const router = useRouter();
  const { user } = useAuthStore();
    const { getItemCount, updateCartItem } = useCartStore();
  const itemCount = getItemCount(product?.id);
  const isOutOfStock = product?.stock === 0;

  const handleRemoveProduct = async() => {
     if (!user) return router.push("/login");
  await updateCartItem(user.id, product?.id, itemCount - 1);
    if (itemCount > 1) {
      toast.success("Quantity Decreased successfully!");
    } else {
      toast.success(`${product?.title?.substring(0, 12)} removed successfully!`);
    }
  };

  const handleAddToCart = async () => {
      if (!user) return router.push("/login");
    if ((product?.stock as number) > itemCount) {
       await updateCartItem(user.id, product?.id, itemCount + 1);
      toast.success("Quantity Increased successfully!");
    } else {
      toast.error("Can not add more than available stock");
    }
  };

  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
      <Button
        onClick={handleRemoveProduct}
        variant="outline"
        size="icon"
        disabled={itemCount === 0 || isOutOfStock}
        className="w-6 h-6 border hover:bg-shop_dark_green/20 hoverEffect"
      >
        <Minus />
      </Button>
      <span className="font-semibold text-sm w-6 text-center text-darkColor">
        {itemCount}
      </span>
      <Button
        onClick={handleAddToCart}
        variant="outline"
        size="icon"
        disabled={isOutOfStock}
        className="w-6 h-6 border hover:bg-shop_dark_green/20 hoverEffect"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
