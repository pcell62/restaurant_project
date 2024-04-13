"use client";
import React, { useState, useEffect } from "react";

import ResForm from "./(components)/ResForm";
import { FaArrowRight } from "react-icons/fa";
import RestaurantCard from "./(components)/ResturantCard";
import Link from "next/link";

const Page = () => {
  const indianFoods = [
    {
      name: "Butter Chicken",
      description:
        "A classic Indian dish made with tender chicken cooked in a creamy tomato sauce.",
      image:
        "https://www.177milkstreet.com/assets/site/Recipes/_large/Butter-Chicken.jpg",
    },
    {
      name: "Palak Paneer",
      description:
        "A vegetarian dish consisting of paneer (Indian cheese) in a thick paste made from puréed spinach.",
      image:
        "https://healthynibblesandbits.com/wp-content/uploads/2020/01/Saag-Paneer-FF.jpg",
    },
    {
      name: "Biryani",
      description:
        "A fragrant rice dish cooked with Indian spices, meat (such as chicken or lamb), and vegetables.",
      image:
        "https://i.pinimg.com/736x/29/a2/50/29a250fef4c1e5190dc14da037ca751f.jpg",
    },
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://wallpapers.com/images/hd/classy-butter-chicken-platter-indian-food-s8a8b9aojk6kqoz0.jpg",
    "https://c4.wallpaperflare.com/wallpaper/559/564/946/cuisine-food-india-indian-wallpaper-preview.jpg",
    "https://w0.peakpx.com/wallpaper/35/401/HD-wallpaper-upcoming-restaurants-across-the-north-and-south-carolina-eater-carolinas-north-indian-food.jpg",
    "https://c4.wallpaperflare.com/wallpaper/51/214/360/cuisine-food-india-indian-wallpaper-preview.jpg",
    "https://wallpapers.com/images/hd/healthy-traditional-indian-food-photograph-ajzozfovviyc3sic.jpg",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="mt-20 p-6">
      <div className="relative">
        <img
          src={images[currentImageIndex]}
          alt="food-banner"
          className="w-full rounded-2xl h-[80vh] bg-no-repeat brightness-60 filter blur-[2px]"
        />
        <div className="text-6xl  absolute top-1/2 left-20 -translate-y-1/2 p-6  backdrop-blur-2xl shadow-2xl rounded-2xl ">
          <div className=" font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] tracking-wide">
            Let us serve you <br />
            better
          </div>
        </div>
        <ResForm />
      </div>
      <div className="flex p-7 mt-5">
        <div className="w-1/2 p-5">
          <div className=" text-xl font-Raleway tracking-tight backdrop-blur-sm">
            BigBites: Where Flavor Meets Adventure. Explore our culinary world
            of mouthwatering delights, from traditional classics to innovative
            creations. Savor the essence of diverse cuisines crafted with
            passion and served with a side of excitement. Join us on a journey
            of taste that&apos;s bound to leave you craving for more.
          </div>
          <div className="py-10">
            <Link href="/menu">
              <button className="flex justify-center items-center gap-2  h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44]  hover:shadow-xl p-2 tracking-wider">
                View our Menu <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-1/2 p-5">
          <div>
            <img
              src="https://niksharmacooks.com/wp-content/uploads/2022/11/ButterChickenDSC_5616.jpg"
              alt="buuter-chicken"
              className="rounded-t-3xl"
            />
          </div>
          <div className="flex">
            <div className="w-1/2">
              <img
                src="https://www.vegrecipesofindia.com/wp-content/uploads/2014/05/idli-sambar-1.jpg"
                alt="idli-sambar"
                className="rounded-bl-3xl"
              />
            </div>
            <div className="w-1/2">
              <img
                src="https://www.cookwithmanali.com/wp-content/uploads/2018/05/Best-Pav-Bhaji-Recipe-500x500.jpg"
                alt="pav-bhaji"
                className="rounded-br-3xl"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Some of our most popular delicacies
        </h2>
        <div className="flex flex-wrap gap-8 justify-around">
          {indianFoods.map((food, index) => (
            <RestaurantCard
              key={index}
              name={food.name}
              description={food.description}
              image={food.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
