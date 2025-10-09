"use client";
import React, { useEffect, useRef } from "react";
import useVideoScroll from "@/Animation/UseVideoScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { splitTextByChars } from "@/Animation/GsapAnimation";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);
const truckData = [
  {
    label: "Electrical Insulation",
    icon: "/assets/img/truck/electrical-insulation.svg",
  },
  {
    label: "EMI Shielding",
    icon: "/assets/img/truck/emi-shielding.svg",
  },
  {
    label: "Fire Protection",
    icon: "/assets/img/truck/fire-protection.svg",
  },
  {
    label: "Heat Reflection",
    icon: "/assets/img/truck/heat-reflection.svg",
  },
  {
    label: "Impact Protection",
    icon: "/assets/img/truck/impact-protection.svg",
  },
  {
    label: "Mechanical Protection",
    icon: "/assets/img/truck/mechanical-protection.svg",
  },
  {
    label: "Noise Reduction",
    icon: "/assets/img/truck/noise-reduction.svg",
  },
  {
    label: "Thermal Protection & Runaway",
    icon: "/assets/img/truck/thermal-protection.svg",
  },
]

export default function TruckMobile() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
 




  return (
    <>
    <section
      ref={containerRef}
      id="truck"
      className="w-full hidden max-md:block h-screen text-white relative "
    >
      <div className="h-screen overflow-hidden w-full sticky top-0">
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          loop
          className="w-full h-full object-cover"
          src="/assets/videos/truck/truck.mp4"
        />
        <div className="w-full h-full flex absolute inset-0 z-[1]">
          <div className="h-full px-[3vw] flex-col flex items-center justify-center relativepy-[4vw] w-[50%]">
            <h2 className="max-sm:text-[11.5vw] text-[5vw] absolute top-[15vw] left-[3vw] leading-none max-sm:w-[90%] w-[40%]">
              Where power meets protection
            </h2>
          </div>
          <div className="h-full relative px-[3vw] py-[1.5vw] w-[100%]">
            <h2 className="max-sm:text-[11.5vw] text-[5vw] leading-none absolute text-right right-[3vw] bottom-[15vw] max-sm:w-[100%] w-[50%] ">
              Discover what's inside
            </h2>
           
          </div>
        </div>
      </div>
    </section>
    <section className="h-fit py-[10vw] max-sm:py-[5vw] text-blackshade bg-[#e3e1e0] w-full hidden max-md:block">
            <div className="h-[100%] max-sm:h-[90%] flex flex-col justify-center w-full max-sm:space-y-[8vw] space-y-[3vw] px-[6vw] pt-[7vw] ">
              <p className="font-DMMono cursor-pointer max-sm:text-[3vw] text-[1.5vw] leading-[1.1] font-medium uppercase">Top tier solutions for:</p>
              <div className="space-y-[5vw] h-fit ">

              {truckData.map((item) => (
                <div key={item.label} className="w-full flex items-center gap-[3vw] max-sm:mb-[3vw] mb-[1.5vw]">
                  <div className="max-sm:w-[10vw] max-sm:h-[10vw] w-[5vw] h-[5vw] bg-white/70 text-blackshade rounded-[2vw] max-sm:p-[2.5vw] p-[1.2vw] flex items-center justify-center">
                    <Image src={item.icon} className="mix-blend-difference" alt={item.label} width={100} height={100} />
                  </div>
                  <p className="max-sm:text-[5vw] text-[3vw] font-robert font-medium">{item.label}</p>
                </div>
              ))}

              </div>
            </div>
    </section>
    </>
  );
}
