import { Brand } from "@/types/active_ecommerce_json";
import React from "react";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  brands: Brand[];
  selectedBrand?: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">Brands</Title>
      <RadioGroup value={selectedBrand || ""} className="mt-2 space-y-1">
        {brands?.map((brand) => (
          <div
            key={brand?.id}
            onClick={() => setSelectedBrand(brand?.slug)}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={brand?.slug}
              id={brand?.slug}
              className="rounded-sm"
            />
            <Label
              htmlFor={brand?.slug}
              className={`capitalize ${selectedBrand === brand?.slug ? "font-semibold text-shop_dark_green" : "font-normal"}`}
            >
              {brand?.title}
            </Label>
          </div>
        ))}
        {selectedBrand && (
          <button
            onClick={() => setSelectedBrand(null)}
            className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left"
          >
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default BrandList;
