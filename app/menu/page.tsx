"use client";
import React, { useState, useEffect } from "react";
import { MenuList } from "../order/data";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [viewMode, setViewMode] = useState("detailed"); // Default view mode is detailed

  useEffect(() => {
    const fetchData = async () => {
      // Simulating fetching menu items
      setMenuItems(MenuList);
    };

    fetchData();
  }, []);

  // Group menu items by category
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    acc[item.category] = [...(acc[item.category] || []), item];
    return acc;
  }, {});

  const toggleViewMode = () => {
    setViewMode(viewMode === "detailed" ? "compact" : "detailed");
  };

  return (
    <div className="my-24">
      <main className=" mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Menu</h1>
        <div className="flex justify-center mb-4">
          <button
            className="flex justify-center items-center gap-2  h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44]  hover:shadow-xl p-2 tracking-wider"
            onClick={toggleViewMode}
          >
            {viewMode === "detailed" ? "Compact" : "Detailed"}
          </button>
        </div>
        {viewMode === "detailed" && (
          <div className="grid grid-cols-1 gap-6">
            {Object.entries(groupedMenuItems).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item, index) => (
                    <div
                      className="flex items-center border-2 rounded-lg border-black backdrop-blur-sm"
                      key={index}
                    >
                      <div className="bg-transparent  flex items-center w-1/2">
                        <div className="p-6">
                          <h3 className="text-lg font-semibold mb-2">
                            {item.name}
                          </h3>
                          <p className="text-gray-700 font-bold">
                            {item.price}
                          </p>
                          <p className="text-gray-700">Serves: {item.serves}</p>
                        </div>
                      </div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-auto"
                        style={{ maxHeight: "200px" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {viewMode === "compact" && (
          <div className="flex flex-wrap gap-12 justify-center p-6">
            {Object.entries(groupedMenuItems).map(([category, items]) => (
              <div key={category} className="mb-6 w-[400px] border-black">
                <h2 className="text-3xl font-semibold mb-2">{category}</h2>
                <ul>
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between border-b-2 border-slate-700 py-2"
                    >
                      <span className="text-lg">{item.name}</span>
                      <span className="text-gray-700 font-bold">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Menu;
