"use client";
import { Category, fetchCategories } from "@/types/active_ecommerce_json";
import React, { useEffect, useState } from "react";
interface Props {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}
const ProductTabButton = ({ selectedTab, setSelectedTab }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  return (
    <div className="flex items-center flex-wrap gap-5 justify-between">
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        <div className="flex items-center gap-1.5 md:gap-3">
          {categories &&
            categories.length > 0 &&
            categories
              .map((category) => (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => setSelectedTab(category.id)}
                  className={`border border-shop_light_green/30 text-nowrap  capitalize px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_light_green hover:border-shop_light_green hover:text-white hoverEffect ${selectedTab === category.id ? "bg-shop_light_green text-white border-shop_light_green" : "bg-shop_light_green/10"}`}
                >
                  {category.title}
                </button>
              ))
              .slice(0, 6)}
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
