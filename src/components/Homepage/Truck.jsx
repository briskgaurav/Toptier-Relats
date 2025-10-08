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

export default function Truck() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const cleanup = useVideoScroll({
      video,
      container,
      triggerValues: { start: "top 50%", end: "90% 0%" },
    });

    return cleanup;
  }, []);

  useEffect(() => {
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "20% 0%",
        scrub: true,
        markers: false,
      },
    });

    const splittedText = splitTextByChars(".truckText");
    const splittedText2 = splitTextByChars(".truckText2");

    gsap.set(splittedText.chars, { opacity: 0 });
    gsap.set(splittedText2.chars, { opacity: 0 });

    textTl.to(
      splittedText.chars,
      {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        duration: 0.5,
      },
      0
    );

    textTl.to(
      splittedText.chars,
      {
        opacity: 0,
        stagger: 0.06,
        ease: "none",
        duration: 0.5,
      },
      "+=0.5"
    );
    textTl.to(
      splittedText2.chars,
      {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        duration: 0.5,
      },
    );

    textTl.to(
      splittedText2.chars,
      {
        opacity: 0,
        stagger: 0.06,
        ease: "none",
        duration: 0.5,
      },
      "+=0.5"
    );

    const nextTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "20% 20%",
        end: "+=500%",
        scrub: true,
        markers: false,
      },
    });
    const truckItems = gsap.utils.toArray(".truck-items-opacity");
    nextTl.from(".truck-left", {
      opacity: 0,
      duration: 0.5,
    });
    nextTl.from(".truck-right", {
      opacity: 0,
      duration: 0.5,
    },"<");
    nextTl.to(truckItems, {
      opacity: 1,
      duration: 0.5,
      stagger: 1,
      ease: "none",
    });


  }, []);




  return (
    <section
      ref={containerRef}
      id="truck"
      className="w-full h-[800vh] max-md:hidden text-white relative "
    >
      <div className="h-screen overflow-hidden w-full sticky top-0">
        <video
          ref={videoRef}
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/assets/videos/truck/truck.mp4"
        />
        <div className="w-full h-full flex absolute inset-0 z-[1]">
          <div className="h-full px-[3vw] flex-col flex items-center justify-center relativepy-[4vw] w-[50%]">
            <h2 className="heading2 absolute top-[4vw] left-[3vw] truckText w-[40%]">
              Where power meets protection
            </h2>
            <div className="h-[90%] truck-left w-full px-[1vw] space-y-[2vw] pt-[7vw] ">
              <p className="font-DMMono cursor-pointer text-[.8vw] leading-[1.1] font-medium uppercase">Top tier solutions for:</p>
              <div>

              {truckData.map((item) => (
                <div key={item.label} className="w-full flex opacity-15 truck-items-opacity items-center gap-[1vw] mb-[1vw]">
                  <div className="w-[4vw] h-[4vw] bg-white/20 rounded-[1vw] p-[1vw] flex items-center justify-center">
                    <Image src={item.icon} alt={item.label} width={100} height={100} />
                  </div>
                  <p className="content">{item.label}</p>
                </div>
              ))}

              </div>
            </div>
          </div>
          <div className="h-full relative px-[3vw] py-[1.5vw] w-[50%]">
            <h2 className="heading2 absolute text-right right-[3vw] bottom-[4vw] w-[60%] truckText2">
              Discover what's inside
            </h2>
            <div className="h-fit truck-right w-full items-center justify-end gap-[2vw] px-[1vw] flex">
              <div className="flex items-center gap-[1vw]">
                <div className="w-[3vw] h-[3vw] rounded-[1vw] overflow-hidden">
                  <Image src="/assets/img/floating/periflex-emi.jpg" alt="truck" width={100} height={100} />
                </div>
                <p className="text-blackshade text-[1.1vw] leading-[1.1] font-medium">Periflex EMI</p>
              </div>
              <div className="flex items-center gap-[1vw]">
                <div className="w-[3vw] h-[3vw] rounded-[1vw] overflow-hidden">
                  <Image src="/assets/img/floating/plas8-na-black.jpg" alt="truck" width={100} height={100} />
                </div>
                <p className="text-blackshade text-[1.1vw] leading-[1.1] font-medium">PLAS8 NA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
