import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section id="hero" className="h-screen w-full relative">
      <video
        autoPlay
        muted
        playsInline
        loop
        className="h-full w-full object-cover absolute inset-0 z-[1] "
        src="assets/videos/hero/hero.mp4"
      />
      <div className="h-full w-full text-white relative z-[2] flex items-center flex-col justify-end  pb-[10vw]">
        <h1 className=" text-center tracking-tighter text-[5.8vw] w-[70%] leading-[1.1]  font-medium font-robert">
          Protection sleeves for the mobility of tomorrow
        </h1>
    
      </div>
    </section>
  );
}
