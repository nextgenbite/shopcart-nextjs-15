import Container from "@/components/landing/Container";
import ImageView from "@/components/landing/ImageView";
import PriceView from "@/components/landing/PriceView";
import { fetchProductById, Product } from "@/types/dummyjson";
import {
  BadgeQuestionMark,
  CornerDownLeft,
  GitCompare,
  Share2,
  StarIcon,
  Truck,
} from "lucide-react";
import { notFound } from "next/navigation";
const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  let product: Product | null = null;
  try {
    const id = Number(slug);
    if (Number.isNaN(id)) return notFound();
    product = await fetchProductById(id);
    if (!product) return notFound();
  } catch (err) {
    return notFound();
  }
  return (
    <Container className="flex flex-col md:flex-row gap-10 py-10">
      {product?.images && (
        <ImageView images={product?.images} isStock={product?.stock} />
      )}
      <div className="w-full md:w-1/2 flex flex-col gap-5">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{product?.title}</h2>
          <p className="text-sm text-gray-600 tracking-wide">
            {product?.description}
          </p>
          <div className="flex items-center gap-0.5 text-xs">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={12}
                className={
                  index < Math.floor(product.rating || 0)
                    ? "text-shop_light_green"
                    : "text-gray-300"
                }
                fill={
                  index < Math.floor(product.rating || 0)
                    ? "#93D991"
                    : "#e0e0e0"
                }
              />
            ))}
            <p className="font-semibold">{`(${product.reviews?.length || 0})`}</p>
          </div>
        </div>
        <div className="space-y-2 border-t border-b border-gray-200 py-5">
          <PriceView
            price={product.price}
            discount={
              product.discountPercentage
                ? product.price * (product.discountPercentage / 100)
                : 0
            }
            className="text-lg font-bold"
          />
          <p
            className={`px-4 py-1.5 text-sm text-center inline-block font-semibold rounded-lg ${product?.stock === 0 ? "bg-red-100 text-red-600" : "text-green-600 bg-green-100"}`}
          >
            {(product.stock as number) > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
        {/* <div className="flex items-center gap-2.5 lg:gap-3">
          <AddToCartButton product={product} />
          <FavoriteButton showProduct={true} product={product} />
        </div> */}
        {/* <ProductCharacteristics product={product} /> */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2">
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <GitCompare className="text-lg" />
            <p>Compare color</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <BadgeQuestionMark className="text-lg" />
            <p>Ask a question</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <Truck className="text-lg" />
            <p>Delivery & Return</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <Share2 className="text-lg" />
            <p>Share</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="border border-lightColor/25 border-b-0 p-3 flex items-center gap-2.5">
            <Truck size={30} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-black">
                Free Delivery
              </p>
              <p className="text-sm text-gray-500 underline underline-offset-2">
                Enter your Postal code for Delivey Availability.
              </p>
            </div>
          </div>
          <div className="border border-lightColor/25 p-3 flex items-center gap-2.5">
            <CornerDownLeft size={30} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-black">
                Return Delivery
              </p>
              <p className="text-sm text-gray-500 ">
                Free 30days Delivery Returns.{" "}
                <span className="underline underline-offset-2">Details</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetailPage;
