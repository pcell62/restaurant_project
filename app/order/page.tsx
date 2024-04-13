"use client";
import React, { useEffect, useRef, useState } from "react";
import { MenuList } from "./data";
import OrderCard from "../(components)/OrderCard";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import axios from "axios";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });
  const [cartVisible, setCartVisible] = useState(false);
  const cartRef = useRef(null);
  const checkoutRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCheckout, setShowCheckout] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
  });

  function searchFood(event) {
    setSearchTerm(event.target.value);
  }

  function filterByCategory(category) {
    setSelectedCategory(category);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartVisible(false);
      }
      if (checkoutRef.current && !checkoutRef.current.contains(event.target)) {
        setShowCheckout(false); // Close checkout window if clicked outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const addToCart = (food) => {
    const newCart = { ...cart };
    if (newCart[food.name]) {
      newCart[food.name].quantity += 1;
    } else {
      newCart[food.name] = { ...food, quantity: 1 };
    }
    setCart(newCart);
  };

  const removeFromCart = (itemName) => {
    const newCart = { ...cart };
    delete newCart[itemName];
    setCart(newCart);
  };

  const clearCart = () => {
    setCart({});
  };

  const toggleCartVisible = () => {
    setCartVisible(!cartVisible);
  };

  const getTotalPrice = () => {
    let total = 0;
    for (const item in cart) {
      const price = parseInt(cart[item].price.split(" ")[0]);
      total += price * cart[item].quantity;
    }
    return total;
  };

  const handleCheckout = () => {
    if (Object.keys(cart).length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
    } else {
      setCartVisible(false);
      setShowCheckout(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email || !userData.address) {
      alert("Please fill all the fields");
      return;
    }

    if (Object.keys(cart).length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5500/order", {
        userName: userData.name,
        email: userData.email,
        address: userData.address,
        items: Object.values(cart), // Sending an array of items
        totalPrice: getTotalPrice(), // Sending total price
      });

      // Display the order_id in a popup
      alert(`Order placed successfully! Order ID: ${response.data._id}`);

      // Clear the cart and hide the checkout window
      clearCart();
      setShowCheckout(false);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  const filteredMenu = MenuList.filter((food) => {
    const matchesSearchTerm =
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedCategory === "All") {
      return matchesSearchTerm;
    } else {
      return matchesSearchTerm && food.category === selectedCategory;
    }
  });

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <img
          src="https://media.tenor.com/YSHdPP-LR1cAAAAi/star-rail-kuru.gif"
          alt="kuru-kuru"
          className="animate-spin h-20 w-20"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="border border-slate-900 rounded-full p-2 outline-none mt-24"
          onChange={searchFood}
        />
        <select
          value={selectedCategory}
          onChange={(e) => filterByCategory(e.target.value)}
          className="ml-4 border border-slate-900 rounded-full p-2 outline-none mt-24"
        >
          <option value="All">All Categories</option>
          <option value="Indian Veg Starter">Indian Veg Starter</option>
          <option value="Indian Non Veg Starter">Indian Non Veg Starter</option>
          <option value="Indian Veg Main Course">Indian Veg Main Course</option>
          <option value="Indian Non Veg Main Course">
            Indian Non Veg Main Course
          </option>
          <option value="Indian Breads">Indian Breads</option>
          <option value="Rice">Rice</option>
          <option value="Desserts">Desserts</option>
          <option value="Beverage">Beverage</option>
        </select>
        <button
          onClick={toggleCartVisible}
          className="ml-auto rounded-full p-4 outline-none mt-24 flex items-center gap-3 relative bg-[#a86a44] hover:shadow-xl"
        >
          <FaShoppingCart />
          {cart && Object.keys(cart).length > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 bg-red-600 border-black border text-white rounded-full flex items-center justify-center text-xs">
              {Object.keys(cart).length}
            </span>
          )}
        </button>
      </div>
      <div className="flex flex-wrap gap-5 mt-12 justify-center">
        {filteredMenu.map((food, index) => (
          <div
            className="flex flex-col backdrop-blur-sm shadow-xl hover:shadow-[#a86a44] transition-all duration-500 rounded-xl w-[300px]"
            key={index}
          >
            <OrderCard
              name={food.name}
              description={food.category}
              image={food.image}
              price={food.price}
            />
            <button
              className="flex absolute justify-center items-center gap-2 w-1/2 ml-10 bottom-2 mt
      -4 h-8 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-[#a86a44]  hover:shadow-xl p-2 tracking-tight"
              onClick={() => addToCart(food)}
            >
              Add to cart
            </button>
          </div>
        ))}
        {filteredMenu.length === 0 && (
          <div className="text-center col-span-5 mt-5 text-2xl m-5 backdrop-blur-sm">
            We dont have that yet😔
          </div>
        )}
      </div>
      {cartVisible && (
        <div
          ref={cartRef}
          className="bg-white fixed top-0 right-10 w-1/4 p-4 border border-gray-200 shadow-lg rounded-lg mt-24"
        >
          <h2 className="text-lg font-semibold mb-2">Cart</h2>
          <ul className="divide-y divide-gray-200">
            {cart &&
              Object.keys(cart).map((itemName, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-2"
                >
                  <div>
                    <span>{cart[itemName].name} - </span>
                    <span>{cart[itemName].quantity} </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex gap-3">
                      <button
                        onClick={() => addToCart(cart[itemName])}
                        className="text-gray-500 hover:text-green-600 focus:outline-none text-2xl"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => {
                          if (cart[itemName].quantity === 1) {
                            removeFromCart(itemName);
                          } else {
                            const newCart = { ...cart };
                            newCart[itemName].quantity -= 1;
                            setCart(newCart);
                          }
                        }}
                        className="text-gray-500 hover:text-red-600 focus:outline-none text-2xl"
                      >
                        <FaMinus />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          <div className="mt-4">
            <strong>Total:</strong> {getTotalPrice()} rs
          </div>
          <div className="flex w-full items-center justify-between">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white py-2 px-4 mt-4 rounded hover:bg-red-600 focus:outline-none"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white py-2 px-4 mt-4 rounded hover:bg-green-600 focus:outline-none"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
      {showCheckout && (
        <div className=" fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div
            ref={checkoutRef}
            className="bg-white p-8 rounded-lg shadow-md checkout-window w-[400px]"
          >
            <h2 className="text-lg font-semibold mb-4">Checkout</h2>
            <ul className="divide-y divide-gray-200">
              {Object.keys(cart).map((itemName, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-2"
                >
                  <div>
                    <span>{cart[itemName].name} - </span>
                    <span>{cart[itemName].quantity} </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <strong>Total:</strong> {getTotalPrice()} rs
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              />
              <textarea
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              />
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 mt-2 rounded hover:bg-green-600 focus:outline-none"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
