import React from "react";

const Page = () => {
  return (
    <div className="p-10 flex justify-center mt-24 items-center">
      <div className="p-10 text-2xl font-bold backdrop-blur-sm mr-10 hover:shadow-2xl shadow-[#a86a44]">
        123 Main Street, <br /> New Delhi, Delhi <br /> PIN - 110017
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.954412784498!2d79.16174157586481!3d12.974767614807178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad47a36f5b0d4b%3A0x983cad8ccde24f9e!2sVIT!5e0!3m2!1sen!2sin!4v1713673544962!5m2!1sen!2sin"
        width="600"
        height="450"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-3xl hover:shadow-2xl shadow-[#a86a44]"
      ></iframe>
    </div>
  );
};

export default Page;
