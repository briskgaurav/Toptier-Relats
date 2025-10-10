"use client";
import React, { useEffect, useRef, useState } from "react";
import useVideoScroll from "@/Animation/UseVideoScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Cards from "./Cards";
import Image from "next/image";
import IndustriesAnimation from "./IndustriesAnimation";
gsap.registerPlugin(ScrollTrigger);

export default function Periflex() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const periflexContainerRef = useRef(null);
  const [activeIndustry, setActiveIndustry] = useState("Ovens");

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const cleanup = useVideoScroll({
      video,
      scrub: true,
      container,
      markers: false,
      triggerValues: {
        start: "-5% top",
        end: "30% top",

      },
    });

    return cleanup;
  }, []);

  useEffect(() => {
    if (!containerRef.current || !periflexContainerRef.current) return;

    gsap.set(periflexContainerRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "23% 0%",
        end: "40% 100%",
        scrub: true,
        markers: false,
      },
    });

    tl.to(periflexContainerRef.current, {
      opacity: 1,
      ease: "power2.inOut",
    });
    tl.from(
      ".cards",
      {
        y: 20,
        opacity: 0,
        stagger: 0.14,
        ease: "power2.inOut",
      },
      "<+.2"
    );
    // further scroll active logic

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="periflex"
      ref={containerRef}
      className="w-full max-md:hidden relative h-[1600vh]"
    >
      <div className="w-full h-screen overflow-hidden sticky top-0">
        <video
          ref={videoRef}
          src={
            "/assets/videos/periflex/periflex.mp4"
          }
          className="w-full h-full object-cover"
          muted
          loop
        />
        <div
          ref={periflexContainerRef}
          className="w-full h-screen flex absolute inset-0  z-[2] periflex-container"
        >
          <div className="w-[60%] flex-col h-full gap-[1vw] flex items-start pl-[3%] pb-[8.5%] justify-end ">
            <h2 className="heading text-white">Periflex DURA HA</h2>
            <div className="flex items-center gap-[1vw]">
              <p className="text-[.8vw] leading-[1.1] font-medium font-DMMono uppercase">
                Available in{" "}
              </p>
              <span className="w-[.8vw] h-[.8vw] bg-blackshade rounded-full"></span>
            </div>
          </div>
          <div className="w-[40%] h-full relative">
            <Cards positionClassName="absolute cards top-[20%] left-[15%]" svgColor="text-white" />
            <Cards svgColor="text-white" extraContent="(100.000 - 199.999 cycles)" extraContentClassName="mt-[-3vw] text-[1.35vw]" content="ISO 6722-1 
Class 7" heading="Mechanical Protection" contentClassName="text-[1.8vw] mt-[-1vw]" positionClassName="absolute cards top-[30%] left-[55%]" />
          </div>
        </div>
        <IndustriesAnimation activeIndustry={activeIndustry} setActiveIndustry={setActiveIndustry} containerRef={containerRef} />
      </div>
    </section>
  );
}
