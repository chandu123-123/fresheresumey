"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
const Typewrite = () => {
  return (
    <div className="text-[0.7rem] px-2 text-center">
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          "Struggling to create a Resume for",
          1000, // wait 1s before replacing "Mice" with "Hamsters"
          "Struggling to create a Resume for Companies",
          // 1000,
          // 'We produce food for Guinea Pigs',
          // 1000,
          // 'We produce food for Chinchillas',
          1000,
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: "2em", display: "inline-block" }}
        repeat={Infinity}
      />
    </div>
  );
};

export default Typewrite;
