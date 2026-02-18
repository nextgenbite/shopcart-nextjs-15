"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  images?: any[];
  isStock?: number | undefined;
}

const ImageView = ({ images = [], isStock }: Props) => {
  const [active, setActive] = useState(process.env.NEXT_PUBLIC_BACKEND_URL + '/' + images[0].path);
console.log("Active image in ImageView:", images);
  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-137.5 min-h-112.5 border border-darkColor/10 rounded-md group overflow-hidden"
        >
          <Image
            src={active}
            alt="productImage"
            width={700}
            height={700}
            
            className={`w-full h-96 max-h-137.5 min-h-112.5 object-contain group-hover:scale-110 hoverEffect rounded-md ${
              isStock === 0 ? "opacity-50" : ""
            }`}
          />
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-6 gap-2 h-20 md:h-24">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setActive(image)}
            className={`border rounded-md overflow-hidden ${active === image ? "border-darkColor opacity-100" : "opacity-80"}`}
          >
            <Image
              src={process.env.NEXT_PUBLIC_BACKEND_URL + '/' +image.path}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="w-full h-auto object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
