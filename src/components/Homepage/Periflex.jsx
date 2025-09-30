"use client";
import React, { useEffect, useRef, useState } from "react";
import useVideoScroll from "@/Animation/UseVideoScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Cards from "./Cards";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

const industries = [
  { name: "Ovens", image: "/images/industries/ovens.png" },
  { name: "Vitroceramics", image: "/images/industries/vitroceramics.png" },
  { name: "Industrial", image: "/images/industries/industrial.png" },
  { name: "Heat", image: "/images/industries/heat.png" },
  { name: "Electricity", image: "/images/industries/electricity.png" },
  { name: "Electromagnetic", image: "/images/industries/electromagnetic.png" },
  { name: "Robotics", image: "/images/industries/robotics.png" },
];

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
      container,
      triggerValues: {
        start: "top 80%",
        end: "90% 100%",
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
        start: "60% 80%",
        end: "100% 100%",
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
    tl.to(".blackContainer", {
      opacity: 1,
      ease: "power2.inOut",
    });
    tl.to(
      ".inner-containers",
      {
        translateY: 0,
        ease: "power2.inOut",
      },
      "<"
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
      className="w-full relative h-[800vh]"
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
            <Cards positionClassName="absolute cards top-[20%] left-[15%]" />
            <Cards positionClassName="absolute cards top-[30%] left-[55%]" />
          </div>
        </div>
        <div className="w-full h-screen flex  px-[3vw] pb-[4vw]  absolute  inset-0 z-[3]">
          <div className="w-full h-full absolute top-0 left-0 blackContainer opacity-0 bg-[#252525]" />

          <div className="w-full h-full flex gap-[1.2vw] inner-containers translate-y-[100%] items-end justify-center">
            <div className="w-[42%] flex flex-col items-center justify-between text-blackshade h-[85%] py-[2vw] px-[1vw] bg-[#EAE4DF] rounded-[1.5vw]">
              <p className="font-DMMono mt-[1vw] text-[.85vw] tracking-tight leading-[1.1] font-medium uppercase opacity-40">
                OTHERS INDUSTRIES
              </p>
              <div className="overflow-hidden space-y-[1vh] text-center h-fit w-full max-h-[18vh]">
                {industries.map((industry) => (
                  <p
                    key={industry.name}
                    className={`content translate-y-[100%] h-[5vh] flex items-center justify-center ${
                      activeIndustry === industry.name
                        ? "opacity-100"
                        : "opacity-20"
                    }`}
                  >
                    {industry.name}
                  </p>
                ))}
              </div>
              <div className="capitalize flex items-center justify-between w-full">
                {industries.map((item) => (
                  <p
                    key={item.name}
                    className={`font-DMMono cursor-pointer text-[.75vw] leading-[1.1] font-medium buttons uppercase ${
                      activeIndustry === item.name
                        ? "opacity-100"
                        : "opacity-40"
                    }`}
                    onClick={() => setActiveIndustry(item.name)}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="w-[58%] relative h-[85%] rounded-[1.5vw]">
              <div className="w-full relative overflow-hidden rounded-[1.5vw] h-full">
                <Image
                  src={"/assets/img/industries/ovens.jpg"}
                  alt="periflex-emi"
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
              {industries.slice(1).map((industry, idx) => (
                <div
                  key={industry.name}
                  className={`w-full absolute bottom-0 left-0 z-[${idx + 2}] overflow-hidden rounded-[1.5vw] h-0 origin-bottom`}
                >
                  <Image
                    src={industry.image.replace('/images/industries/', '/assets/img/industries/').replace('.png', '.jpg')}
                    alt="periflex-emi"
                    height={500}
                    width={500}
                    className="h-full relative w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
