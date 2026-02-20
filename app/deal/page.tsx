'use client'

import Container from "@/components/landing/Container";
import ProductCard from "@/components/landing/ProductCard";
import { Title } from "@/components/ui/text";
import { getProductsByQuery, Product } from "@/types/active_ecommerce_json";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";

const DealPage = () => {
  const [isPending,startTransition] = useTransition();
  // const products = await getDealProducts();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    // console.log("initialProducts in ProductGrid:", products);
    useEffect(() => {
      try {
  startTransition(async() => {
    const data = await getProductsByQuery({  sort: "latest" });
    setProducts(data);
  });
 
      }catch (error) {
        console.error("Error in useEffect:", error);
        setLoading(false);
      }
}, []);
  return (
    <div className="py-10 bg-deal-bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-1 text-base uppercase tracking-wide">
          Hot Deals of the Week
        </Title>
      
          {isPending ? (
           <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
                    <motion.div className="flex items-center space-x-2 text-shop-light_green">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Product is loading...</span>
                    </motion.div>
                  </div>
              ) : products && products.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No products available.</p>
                </div>
              )
                }
       
      </Container>
    </div>
  );
};

export default DealPage;
