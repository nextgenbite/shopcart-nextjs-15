"use client";
import { Product } from "@/types/active_ecommerce_json";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addToCart, getItemCount } = useCartStore();
  const router = useRouter();
  const { user } = useAuthStore();

  const itemCount = getItemCount(product?.id);
  const isOutOfStock = product?.stock === 0 || itemCount >= (product?.stock as number);

  const handleAddToCart = async () => {
    if (!user) return router.push("/login");
    try {
      if ((product?.stock as number) > itemCount) {
        await addToCart(user.id, product?.id, 1);
        toast.success(
          `${product?.title?.substring(0, 12)}... added successfully!`,
        );
      } else {
        toast.error("Can not add more than available stock");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to add item to cart");
    }
  };
  return (
    <div className="w-full h-12 flex items-center">
      {itemCount > 0 ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-darkColor/80">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock }
          className={cn(
            "w-full bg-shop_dark_green/80 text-lightBg shadow-none border border-shop_dark_green/80 font-semibold tracking-wide text-white hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect",
            className,
          )}
        >
          <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
