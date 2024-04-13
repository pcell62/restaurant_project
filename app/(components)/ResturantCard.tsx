import React from "react";
import Link from "next/link";

const RestaurantCard = ({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 backdrop-blur-sm">
      <img className="w-full h-56 object-cover" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        <Link href="/order">
          <button className="flex justify-center items-center gap-2  h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44]  hover:shadow-xl p-2 tracking-wider">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
