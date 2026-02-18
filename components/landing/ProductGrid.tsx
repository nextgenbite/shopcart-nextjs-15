"use client";
import React, { Suspense, useEffect, useState } from "react";
import ProductTabButton from "./ProductTabButton";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import { Product } from "@/types/active_ecommerce_json";
import { tr } from "motion/react-client";

async function getProductsByQuery(params: {
  category?: number;
  brand?: number;
  sort?: string;
}): Promise<Product[]> {
  const qs = new URLSearchParams();
  if (params.category) qs.set("category", String(params.category));
  if (params.brand) qs.set("brand", String(params.brand));
  if (params.sort) qs.set("sort", params.sort);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/public/products?${qs.toString()}`,
    {
      // SSR with 60s caching
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) throw new Error(`fetchProducts failed: ${res.status}`);
  const data = await res.json();
  console.log("getProductsByQuery response:", data);
  return data; // assuming paginated response
}

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // console.log("initialProducts in ProductGrid:", products);
  useEffect(() => {
    setLoading(true);
    try {

      getProductsByQuery({ category: Number(selectedTab), sort: "latest" })
        .then((data) => {
          setProducts(data?.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }catch (error) {
      console.error("Error in useEffect:", error);
      setLoading(false);
    }
    // const fetchData = async () => {
    //   setLoading(true);
    //   try {
    //     const res = await fetch(
    //       `https://dummyjson.com/products${selectedTab ? `/category/${selectedTab}` : ""}`,
    //     );
    //     const data = await res.json();
    //     setProducts(data.products);
    //   } catch (error) {
    //     console.error("Error fetching products:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchData();
  }, [selectedTab]);
  return (
    <div className="py-10">
      <ProductTabButton
        selectedTab={Number(selectedTab)}
        setSelectedTab={setSelectedTab}
      />
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
            <motion.div className="flex items-center space-x-2 text-shop-light_green">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Product is loading...</span>
            </motion.div>
          </div>
        }
      >
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
            {products.map((product) => (
              <AnimatePresence key={product?.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard key={product?.id} product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        ) : (
          <NoProductAvailable selectedTab={selectedTab} />
        )}
      </Suspense>
    </div>
  );
};

export default ProductGrid;
