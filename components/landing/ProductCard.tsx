
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Flame, StarIcon } from "lucide-react";
import Title from "./Title";
import PriceView from "./PriceView";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";
// import AddToCartButton from "./AddToCartButton";

const ProductCard = ({product}: any) => {
  return (
    <div className="text-sm border rounded-md border-darkBlue/20 group bg-white">
      <div className="relative group overflow-hidden bg-shop_light_bg">
        {product?.images && (
          <Link href={`/product/${product?.id}`}>
            <Image
              src={product.images[0]}
              alt="productImage"
              width={500}
              height={500}
              priority
              className={`w-full h-64 object-contain overflow-hidden transition-transform bg-shop_light_bg duration-500 
              ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}
        <ProductSideMenu product={product} />
        {product?.status === "sale" ? (
          <p className="absolute top-2 left-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full group-hover:border-lightGreen hover:text-shop_dark_green hoverEffect">
            Sale!
          </p>
        ) : (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 border border-shop_orange/50 p-1 rounded-full group-hover:border-shop_orange hover:text-shop_dark_green hoverEffect"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-shop_orange/50 group-hover:text-shop_orange hoverEffect"
            />
          </Link>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs font-medium text-lightText">
            {product.categories.map((cat: Object) => cat).join(", ")}
          </p>
        )}
        <Title className="text-sm line-clamp-1">{product?.title}</Title>
      <div className="flex items-center gap-0.5 text-xs">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={12}
                className={index < Math.floor(product?.rating || 0) ? "text-shop_light_green" : "text-gray-300"}
                fill={index < Math.floor(product?.rating || 0) ? "#93D991" : "#e0e0e0"}
              />
            ))}
            <p className="font-semibold">{`(${product?.reviews.length || 0})`}</p>
          </div>

        <div className="flex items-center gap-2.5">
          <p className="font-medium">In Stock</p>
          <p
            className={`${product?.stock === 0 ? "text-red-600" : "text-shop_dark_green/80 font-semibold"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
          </p>
        </div>

        <PriceView
          price={product?.price}
          discount={product?.discountPercentage ? product?.price * (product?.discountPercentage / 100) as number : 0}
          className="text-sm"
        />
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;
