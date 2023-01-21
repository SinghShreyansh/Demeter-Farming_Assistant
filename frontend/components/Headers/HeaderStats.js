import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats({ headerText }) {
  return (
    <>
      {/* Header */}
      <div className="relative bg-[url('https://media.istockphoto.com/id/1249522339/photo/tractor-spray-fertilizer-on-green-field.jpg?b=1&s=612x612&w=0&k=20&c=9KKjkmfpiPSIckt5GUUz45zEKpZBxeO3R7KGyuf-Br4=')] bg-no-repeat bg-cover md:pt-32 pb-32 pt-12">
        <div className="text-4xl text-white text-center font-semibold">
          {headerText}
        </div>
      </div>
    </>
  );
}
