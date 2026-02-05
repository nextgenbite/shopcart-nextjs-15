'use client';
import React, { use, useEffect, useState } from "react";
import ProductTabButton from "./ProductTabButton";


const ProductGrid = () => {
    const [selectedTab, setSelectedTab] = useState<string>("all");
    const [products, setProducts] = useState<any[]>([]);
const [loding, setLoading] = useState<boolean>(true);
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetch(`https://dummyjson.com/products`);
          const data = await res.json();
          setProducts(data.products);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [selectedTab]);
  return (
    <div className="py-10">
      <ProductTabButton selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
{loding ? (
  <div className="col-span-full text-center">Loading...</div>
) : (
  products.map((product) => (
    <div key={product.id} className="border border-gray-200 rounded-lg p-4">
      <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="mt-2 text-sm font-semibold">{product.title}</h3>
      <p className="text-xs text-gray-500">{product.category}</p>
    </div>
  ))
)}
      </div>
    </div>
  );
};

export default ProductGrid;
