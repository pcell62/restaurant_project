"use client";
import React, { useState } from "react";
import axios from "axios";

const page = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const queryData = {
    mobileNumber,
    email,
    query,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://resturant-project.onrender.com/query", queryData)
      .then((res) => {
        alert("Query submitted successfully");
        setLoading(false);
      })
      .catch((err) => {
        alert("Something went wrong");
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Contact Us at</h2>
        <div className="pb-6">
          <p>Email - bigbites@bigbites.com</p>
          <p>Mobile - xxxxxxxxxx</p>
          <p className="font-bold">Or, leave a query below</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 "
              htmlFor="mobile"
            >
              Mobile Number
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mobile"
              type="number"
              placeholder="Enter your mobile number"
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              min={1000000000}
              max={9999999999}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="query"
            >
              Query
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="query"
              rows={4}
              placeholder="Enter your query"
              onChange={(e) => setQuery(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
