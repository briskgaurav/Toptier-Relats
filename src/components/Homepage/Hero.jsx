"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { splitTextByChars } from "@/Animation/GsapAnimation";
import MorePerflix from "../Floating/MorePerflix";
gsap.registerPlugin(ScrollTrigger);


export default function Hero() {
  const headingRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!headingRef.current || !containerRef.current) return;

    const charSpans = splitTextByChars(headingRef.current);
    gsap.set(charSpans.chars, { opacity: 1 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "10% top",
        end: "80% top",
        scrub: true,
        markers: false,
      },
    });
    tl.to(
      charSpans.chars,
      {
        opacity: 0,
        stagger: 0.06,
        ease: "none",
        duration: 0.5,
      },
      
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="h-screen w-full relative overflow-x-hidden"
    >
      
      <video
        autoPlay
        muted
        playsInline
        loop
        className="h-full w-full object-cover absolute inset-0 z-[1] "
        src="assets/videos/hero/hero.mp4"
      />
      <div className="h-full w-full text-white relative z-[2] flex items-center flex-col justify-end  pb-[10vw] max-md:pb-[30vw]">
        <h1
          ref={headingRef}
          className="text-center tracking-tighter  max-sm:text-[11.5vw] text-[5.8vw] w-[90%] max-sm:w-[89%] max-md:w-[65%] leading-[1.1] font-medium font-robert"
        >
          Protection sleeves for the mobility <br className="max-md:hidden" /> of tomorrow
        </h1>
      </div>
    </section>
  );
}
