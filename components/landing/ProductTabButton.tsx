"use client";
import React, { useEffect, useState } from "react";
interface Props{
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
}
const ProductTabButton = ({selectedTab, setSelectedTab}: Props) => {
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []
);

  return (
          <div className="flex items-center flex-wrap gap-5 justify-between">
        <div className="flex items-center gap-1.5 text-sm font-semibold">
      <div className="flex items-center gap-1.5 md:gap-3">
      {categories && categories.length > 0 && categories
        .slice(0, 6)
        .map((category) => (
          <button
            key={category}
            onClick={() => setSelectedTab(category)}
            className={`border border-shop_light_green/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_light_green hover:border-shop_light_green hover:text-white hoverEffect ${selectedTab === category ? "bg-shop_light_green text-white border-shop_light_green" : "bg-shop_light_green/10"}`}
          >
            {category}
          </button>
        ))}
    </div>
        </div>
        <a
          className="border border-dark-color px-4 py-1 rounded-full hover:bg-shop_light_green hover:text-white hover:border-shop_light_green hoverEffect"
          href="/shop"
        >
          See all
        </a>
      </div>
    
  );
};

export default ProductTabButton;
