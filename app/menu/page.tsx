"use client";
import React, { useState, useEffect } from "react";
import { MenuList } from "../order/data";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [viewMode, setViewMode] = useState("detailed");

  useEffect(() => {
    setMenuItems(MenuList);
  }, []);

  const groupedMenuItems = menuItems.reduce((acc, item) => {
    acc[item.category] = [...(acc[item.category] || []), item];
    return acc;
  }, {});

  return (
    <div className="my-24 mx-auto max-w-6xl px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Menu</h1>
      <div className="flex justify-center mb-6">
        <button
          className="px-6 py-3 rounded-lg shadow-lg text-white font-semibold bg-[#a86a44] hover:bg-[#8b5633] transition"
          onClick={() =>
            setViewMode(viewMode === "detailed" ? "compact" : "detailed")
          }
        >
          {viewMode === "detailed" ? "Compact View" : "Detailed View"}
        </button>
      </div>

      {viewMode === "detailed" ? (
        <div className="grid gap-8">
          {Object.entries(groupedMenuItems).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                {category}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-700 font-bold">₹{item.price}</p>
                      <p className="text-gray-600 text-sm">
                        Serves: {item.serves}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedMenuItems).map(([category, items]) => (
            <div key={category} className="bg-white shadow-md p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 border-b pb-2">
                {category}
              </h2>
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-gray-700 font-medium"
                  >
                    <span>{item.name}</span>
                    <span className="font-bold">₹{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
