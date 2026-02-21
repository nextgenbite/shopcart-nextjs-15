
import React from "react";
import { fetchCategories,fetchBrands } from "@/types/active_ecommerce_json";
import Shop from "@/components/landing/Shop";

const ShopPage = async () => {
  const categories = await fetchCategories();
  const brands = await fetchBrands();
  return (
    <div className="bg-white">
      <Shop categories={categories} brands={brands} />
    </div>
  );
};

export default ShopPage;
