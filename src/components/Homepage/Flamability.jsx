"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { splitTextByChars } from "@/Animation/GsapAnimation";
import CableTypes from "./CableTypes";
import useVideoScroll from "@/Animation/UseVideoScroll";
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Flamability() {
  const [type, setType] = useState("revitex-wsx45");
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const cleanup = useVideoScroll({ video, container });

    return cleanup;
  }, []);

  useEffect(() => {
    let splittedText, splittedText2, splittedText3;
    let tl;

    const ctx = gsap.context(() => {
      // Set initial state
      splittedText = splitTextByChars(".flameText");
      splittedText2 = splitTextByChars(".flamabilityText");
      splittedText3 = splitTextByChars(".insulationText");
      gsap.set(splittedText.chars, { opacity: 0 });
      gsap.set(splittedText2.chars, { opacity: 0 });
      gsap.set(splittedText3.chars, { opacity: 0 });
      gsap.set(".cable-types", { opacity: 0 });

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%",
          scrub: true,
          markers: false,
        },
      });

      // Animate in both flameText lines together
      tl.to(
        splittedText.chars,
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          duration: 0.5,
        },
        0
      );

      // Animate out both flameText lines together
      tl.to(
        splittedText.chars,
        {
          opacity: 0,
          stagger: 0.06,
          ease: "none",
          duration: 0.5,
        },
        "+=0.5"
      );

      // Animate in FLAMABILITY
      tl.to(
        splittedText2.chars,
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          duration: 0.5,
        },
        "+=0.2"
      );

      // Animate out FLAMABILITY
      tl.to(
        splittedText2.chars,
        {
          opacity: 0,
          stagger: 0.06,
          ease: "none",
          duration: 0.5,
        },
        "+=0.5"
      );

      // Animate in INSULATION
      tl.to(
        splittedText3.chars,
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          duration: 0.5,
        },
        "+=0.2"
      );

      // Animate out INSULATION
      tl.to(
        splittedText3.chars,
        {
          opacity: 0,
          stagger: 0.06,
          ease: "none",
          duration: 0.5,
        },
        "+=0.5"
      );

      tl.to(".cable-types", {
        opacity: 1,
      }); 
    }, containerRef);

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.scrollTrigger &&
          timelineRef.current.scrollTrigger.kill();
        timelineRef.current.kill();
      }
      if (splittedText) splittedText.revert();
      if (splittedText2) splittedText2.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="flamability"
      ref={containerRef}
      className="w-full relative h-[800vh]"
    >
      <div className="w-full h-screen sticky top-0 ">
        <video
          className="w-full h-full object-cover absolute inset-0 z-[1]"
          ref={videoRef}
          src="/assets/videos/revitex/busbar.mp4"
          muted
          playsInline
        />
        <div className="h-full w-full flex items-center flex-col justify-center relative z-[2]">
          <p className="text-white text-[12vw] flameText w-[52%] tracking-tighter leading-none font-medium font-robert">
            Up to{" "}
          </p>
          <p className="text-white text-[12vw] flameText w-[52%] text-right tracking-tighter leading-none font-medium font-robert">
            1,000°C
          </p>
          <p className="text-white text-[12vw] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flamabilityText text-center w-full tracking-tighter leading-none font-medium font-robert">
            FLAMABILITY
          </p>
          <div className="w-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center flex-col gap-[1vw]">
            <p className="text-white text-[12vw] w-[52%] tracking-tighter leading-none font-medium font-robert insulationText">
              Electrical
            </p>
            <p className="text-white text-[12vw]  w-[52%] text-right tracking-tighter leading-none font-medium font-robert insulationText">
              Insulation
            </p>
          </div>
          <CableTypes type={type} setType={setType} />
        </div>
      </div>
    </section>
  );
}
