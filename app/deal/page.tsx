'use client'

import Container from "@/components/landing/Container";
import ProductCard from "@/components/landing/ProductCard";
import { Title } from "@/components/ui/text";
import { getProductsByQuery, Product } from "@/types/active_ecommerce_json";
import React, { useEffect, useState } from "react";

const DealPage = () => {
  // const products = await getDealProducts();
   const [selectedTab, setSelectedTab] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    // console.log("initialProducts in ProductGrid:", products);
    useEffect(() => {
      setLoading(true);
      try {
  
        getProductsByQuery({  sort: "latest" })
          .then((data) => {
            console.log("Fetched deal products:", data);
            setProducts(data);
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
}, []);
  return (
    <div className="py-10 bg-deal-bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-1 text-base uppercase tracking-wide">
          Hot Deals of the Week
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
