"use client";
import React, { useState } from "react";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [secretKey, setSecretKey] = useState("");

  const handleInputChange = (event) => {
    setSecretKey(event.target.value);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSecretKey("");
  };

  const handleAdminLinkClick = () => {
    setShowModal(true);
  };

  const handleVerifySecretKey = () => {
    if (secretKey === "hello123") {
      // Redirect to admin page
      window.location.href = "/admin";
    } else {
      alert("Wrong key. Please try again.");
      setSecretKey("");
    }
  };

  return (
    <footer className="bg-[#a86a44] text-white">
      <div className="max-w-[88rem] m-auto md:flex py-8 items-center md:justify-around justify-center">
        <div className="flex flex-col items-center h-full space-y-7 my-4">
          <p>About us</p>
          <p className="mb-4">Terms and Policies</p>
          <button
            onClick={handleAdminLinkClick}
            className="mb-4 cursor-pointer"
          >
            Admin Page
          </button>
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg">
                <h2 className="text-xl mb-4 text-black">Enter Secret Key</h2>
                <input
                  type="password"
                  value={secretKey}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 mb-4 text-black"
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleVerifySecretKey}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                  >
                    Verify
                  </button>
                  <button
                    onClick={handleModalClose}
                    className="bg-red- px-4 py-2 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center my-4">
          <h3 className="text-2xl font-bold mb-4 samarakan">
            BigBites Restaurant
          </h3>
          <p className="mb-4">Address: 123 Main Street, Delhi, India</p>
          <p className="mb-4">Phone: 123-456-7890</p>
          <p>&copy; 2024 BigBites Restaurant. All rights reserved.</p>
        </div>
        <div className="flex items-center h-full gap-x-6 text-3xl w-fit my-4">
          <BsInstagram />
          <BsTwitter />
          <BsFacebook />
          <BsYoutube />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
