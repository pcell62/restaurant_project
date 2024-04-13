import React from "react";
import Link from "next/link";

const OrderCard = ({
  name,
  description,
  image,
  price,
}: {
  name: string;
  description: string;
  image: string;
  price: string;
}) => {
  return (
    <div className="max-w-xs rounded overflow-hidden  m-4  relative p-2">
      <div>
        <img
          className="w-full h-56 object-cover rounded-xl hover:scale-105 transition-all duration-1000"
          src={image}
          alt={name}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p className="text-gray-700 text-base">{price}</p>
      </div>
      <div className="px-6 py-4"></div>
    </div>
  );
};

export default OrderCard;
