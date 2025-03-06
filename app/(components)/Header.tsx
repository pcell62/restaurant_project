"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const Popup = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-[600px]">
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <p>
          BigBites is a restaurant that offers a wide range of mouthwatering
          delights, from traditional classics to innovative creations. Savor the
          essence of diverse cuisines crafted with passion and served with a
          side of excitement. Join us on a journey of taste that&apos;s bound to
          leave you craving for more.
        </p>
        <button
          className="mt-4 bg-red-300 px-4 py-2 rounded-md"
          onClick={closePopup}
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <nav className="p-4 flex items-center w-full bg-transparent font-Raleway rounded-b-lg z-30 relative">
      <div className="flex items-center w-full max-w-[88rem] m-auto justify-between">
        <Link href="/" className="flex items-center gap-x-2">
          <img src="logo.svg" alt="logo" className="h-12 w-12" />
          <p className="text-3xl font-extrabold honk tracking-wider samarakan">
            BigBites
          </p>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-x-5 text-black">
          <button
            className="h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44] hover:shadow-xl p-2 tracking-wider"
            onClick={openPopup}
          >
            About us
          </button>
          <Link href="/location">
            <button className="h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44] hover:shadow-xl p-2 tracking-wider">
              Location
            </button>
          </Link>
          <Link href="/menu">
            <button className="h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44] hover:shadow-xl p-2 tracking-wider">
              Today&apos;s Menu
            </button>
          </Link>
          <Link href="/order">
            <button className="h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44] hover:shadow-xl p-2 tracking-wider">
              Order Online
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={toggleMenu}>
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg p-4 flex flex-col items-center gap-y-4 text-black">
          <button
            className="w-full text-center py-2 bg-[#a86a44] text-white rounded-md"
            onClick={() => {
              openPopup();
              setIsMenuOpen(false);
            }}
          >
            About us
          </button>
          <Link
            href="/location"
            className="w-full text-center py-2 bg-[#a86a44] text-white rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Location
          </Link>
          <Link
            href="/menu"
            className="w-full text-center py-2 bg-[#a86a44] text-white rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Today&apos;s Menu
          </Link>
          <Link
            href="/order"
            className="w-full text-center py-2 bg-[#a86a44] text-white rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Order Online
          </Link>
        </div>
      )}

      {isOpen && <Popup />}
    </nav>
  );
};

export default Header;
