"use client";

import React, { useRef, useEffect } from "react";
import useVideoScroll from "@/Animation/UseVideoScroll";
import { LogoSVG } from "@/Utils/SVGs";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { splitTextByChars } from "@/Animation/GsapAnimation";
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const cleanup = useVideoScroll({
      video,
      container,
      triggerValues: { start: "top top", end: "90% bottom" },
    });

    return cleanup;
  }, []);

  useEffect(() => {
    if (!headingRef.current || !containerRef.current) return;

    const charSpans = splitTextByChars(headingRef.current);
    gsap.set(charSpans.chars, { opacity: 0 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "50% top",
        scrub: true,
        markers: false,
      },
    });
    tl.to(
      charSpans.chars,
      {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        duration: 0.5,
      }
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  const handleTopScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section
        ref={containerRef}
        id="footer"
        className="h-[500vh] relative w-full  "
      >
        <div className="h-screen bg-red-800 overflow-hidden w-full sticky top-0">
          <video
            ref={videoRef}
            src="https://toptier.relats.com/wp-content/themes/relats/videos/jointheride/cable.mp4"
            className="w-full h-full object-cover"
            muted
            playsInline
          />
          <div className="w-full flex-col flex items-center  justify-center gap-[5vw] h-full absolute inset-0">
            <h2
              ref={headingRef}
              className="text-white text-[18vw] tracking-tighter leading-[1.1] font-medium font-robert"
            >
              Join the ride
            </h2>
            <div className="flex items-center gap-[1vw]">
              <button className="py-[1.2vw] px-[2.5vw] hover:bg-orange-500 bg-white text-black rounded-[1vw] text-[1vw] leading-[1.1] font-medium font-robert">
                Browse Catalog
              </button>
              <div className="flex items-center group cursor-pointer gap-[.3vw]">
                <p className="text-[1vw] leading-[1.1] font-medium font-robert group-hover:text-orange-500">
                  Request information
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline ml-2  text-orange-500 align-middle"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-[#1D1D1D] flex items-center w-full  justify-between px-[2vw] py-[1vw]"
        id="footer-navigations"
      >
        <Link href="/" className="w-[10vw] pl-[1vw] py-[1vw] h-fit block hover:opacity-100">
          <LogoSVG />
        </Link>
        <div className="flex w-[64%] items-center justify-between">
          <div className="w-fit flex gap-[1vw]">
            <address className="flex w-fit items-center gap-[1vw] not-italic">
              <div className="p-[.8vw] w-[2vw] h-[2vw] flex items-center justify-center aspect-square flex-shrink-0 bg-white/5 rounded-full">
                <span className="text-[1vw] leading-[1.1] font-medium font-robert">
                  M
                </span>
              </div>
              <a href="mailto:relatshq@relats.com" className="opacity-30 hover:opacity-100">
                relatshq@relats.com
              </a>
            </address>
            {/* Only one address, removed duplicate */}
          </div>
          <p className="text-[.85vw] w-fit leading-[1.1] font-medium font-DMMono">
            RELATS © 2025
          </p>
          <div onClick={handleTopScroll} className="flex -rotate-90 group cursor-pointer  gap-[.3vw]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline ml-2  text-orange-500 align-middle"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
