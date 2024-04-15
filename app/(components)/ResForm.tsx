import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaConciergeBell } from "react-icons/fa";
import axios from "axios";

const ResForm = () => {
  const [date, setDate] = useState(new Date());
  const [session, setSession] = useState("Lunch");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileErrorMessage, setMobileErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [reservationUid, setReservationUid] = useState("");

  const newRes = {
    name: name,
    mobileNumber: mobileNumber,
    date: date.toDateString(),
    session: session,
  };

  const handleMakeReservation = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://resturant-project.onrender.com/reservation",
        newRes
      );
      console.log(res.data);
      setReservationUid(res.data._id);
      setLoading(false);
      setShowPopup(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const isFutureDate = (date) => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 15);
    return date <= futureDate;
  };

  const handleTodayClick = () => {
    setDate(new Date());
  };

  const handleLunchClick = () => {
    setSession("Lunch");
  };

  const handleDinnerClick = () => {
    setSession("Dinner");
  };

  const handleTomorrowClick = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow);
  };

  const someFunc = (e) => {
    if (e.target[1].value.length !== 10) {
      setMobileErrorMessage("Mobile number should be 10 digits");
      e.preventDefault();
      return;
    } else {
      setMobileErrorMessage("");
    }
    e.preventDefault();
    handleMakeReservation(); // Call handleMakeReservation function here
    console.log("Form Submitted");
  };

  return (
    <form onSubmit={someFunc} className="w-full">
      <div className="text-black md:absolute md:top-1/2 md:right-20 md:-translate-y-1/2 p-6 bg-white rounded-2xl max-w-[25rem]">
        {loading && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="spinner-border text-brown" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <p className="text-2xl font-bold p-2">Let us serve you better</p>
        <p className="text-gray-500 p-2">
          Don’t wait in a line to enjoy your meal. Reserve a table in advance
          with us.
        </p>
        <div>
          <div className="p-2">
            <input
              type="text"
              placeholder="Enter your name"
              className="p-2 w-full border border-slate-900 rounded-full outline-none"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="p-2">
            <input
              type="number"
              placeholder="Enter your mobile number"
              className="p-2 w-full border border-slate-900 rounded-full outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
              onChange={(e) => {
                setMobileNumber(e.target.value);
              }}
            />
            {mobileErrorMessage && (
              <div className="text-sm text-red-800"> {mobileErrorMessage}</div>
            )}
          </div>
          <div className="p-2">
            <p className="text-lg">Date</p>
            <div className="flex p-3 items-center gap-x-2 justify-around w-full">
              <button
                type="button"
                className={`p-2 px-4 rounded-full ${
                  date.toDateString() === new Date().toDateString()
                    ? "bg-[#a86a44] text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={handleTodayClick}
              >
                Today
              </button>
              <button
                type="button"
                className={`p-2 px-4 rounded-full ${
                  date.toDateString() ===
                  new Date(
                    new Date().setDate(new Date().getDate() + 1)
                  ).toDateString()
                    ? "bg-[#a86a44] text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={handleTomorrowClick}
              >
                Tomorrow
              </button>
              <DatePicker
                filterDate={isFutureDate}
                selected={date}
                onChange={(date) => setDate(date || new Date())}
                minDate={new Date()}
                maxDate={
                  new Date(new Date().setDate(new Date().getDate() + 15))
                }
                className="max-w-[8rem] p-2 border border-slate-900 rounded-full outline-none"
              />
            </div>
          </div>
          <div className="p-2">
            <p className="text-lg">Session</p>
            <div className="flex p-3 items-center gap-x-2 justify-around w-full">
              <button
                type="button"
                className={`p-2 px-8 rounded-full ${
                  session === "Lunch"
                    ? "bg-[#a86a44] text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={handleLunchClick}
              >
                Lunch
              </button>
              <button
                type="button"
                className={`p-2 px-8 rounded-full ${
                  session === "Dinner"
                    ? "bg-[#a86a44] text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={handleDinnerClick}
              >
                Dinner
              </button>
            </div>
          </div>
        </div>
        <hr className="w-full h-[1px] mx-auto my-2 bg-gray-100 border-0 rounded dark:bg-gray-300" />
        <div className="w-full flex justify-center">
          <button
            className="rounded-full bg-[#a86a44] text-white p-3 font-bold font-Raleway mx-auto mt-4"
            type="submit"
          >
            <div className="w-full flex flex-col">
              <FaConciergeBell className=" text-2xl m-auto" />
              <p>Reserve Table</p>
              {loading && <p className="animate-pulse">Processing...</p>}
            </div>
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-50 z-10">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-xl font-semibold mb-4">
              Reservation Successful!
            </p>
            <p className="text-lg mb-4">
              Your reservation ID is: {reservationUid}{" "}
            </p>
            <p className="text-lg mb-4">
              Please note it for further communication
            </p>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ResForm;
