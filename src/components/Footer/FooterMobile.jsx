"use client";

import React, { useRef, useEffect } from "react";
import useVideoScroll from "@/Animation/UseVideoScroll";
import { LogoSVG } from "@/Utils/SVGs";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { splitTextByChars } from "@/Animation/GsapAnimation";
gsap.registerPlugin(ScrollTrigger);

export default function FooterMobile() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);

//   useEffect(() => {
//     if (!headingRef.current || !containerRef.current) return;

//     const charSpans = splitTextByChars(headingRef.current);
//     gsap.set(charSpans.chars, { opacity: 0 });
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: "top top",
//         end: "50% top",
//         scrub: true,
//         markers: false,
//       },
//     });
//     tl.to(
//       charSpans.chars,
//       {
//         opacity: 1,
//         stagger: 0.06,
//         ease: "none",
//         duration: 0.5,
//       }
//     );

//     return () => {
//       if (tl.scrollTrigger) tl.scrollTrigger.kill();
//       tl.kill();
//     };
//   }, []);

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
        className="h-screen  max-md:block hidden overflow-x-hidden relative w-full  "
      >
        <div className="h-screen bg-[#1D1D1D] overflow-hidden w-full sticky top-0">
          <video
            ref={videoRef}
            src="https://toptier.relats.com/wp-content/themes/relats/videos/jointheride/cable.mp4"
            className="w-full h-full object-cover"
            muted
            autoPlay loop
            playsInline
          />
          <div className="w-full flex-col flex items-center  justify-evenly gap-[5vw] h-full absolute inset-0">
            <h2
              ref={headingRef}
              className="text-white max-sm:text-[35vw] text-[25vw] leading-none  text-center  tracking-tighter font-medium font-robert"
            >
              Join the ride
            </h2>
            <div className="flex flex-col items-center gap-[4vw] w-full mt-[4vw]">
              <button className="w-fit px-[7vw] py-[3.5vw] hover:bg-orange-500 bg-white text-black rounded-[4vw] text-[2.5vw] max-sm:text-[3.5vw] leading-[1.1] font-medium font-robert">
                Browse Catalog
              </button>
              <div className="flex items-center group cursor-pointer gap-[2vw] w-[80vw] justify-center">
                <p className="max-sm:text-[3.5vw] text-[2.5vw] leading-[1.1] font-medium font-robert group-hover:text-orange-500">
                  Request information
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline ml-2 text-orange-500 align-middle"
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
        className="bg-[#1D1D1D] mt-[-.5vw] hidden max-md:flex flex-col items-center w-full  justify-between px-[2vw] py-[1vw]"
        id="footer-navigations"
      >
        <Link href="/" className="max-sm:w-[30vw] w-[20vw] pl-[1vw] py-[1vw] mb-[7vw] h-fit block hover:opacity-100">
          <LogoSVG />
        </Link>
        <div className="flex flex-col w-full items-center justify-center gap-[4vw] mt-[4vw]">
          <div className="w-full flex flex-col  items-center gap-[5vw]">
            <address className="flex flex-col items-start w-full gap-[2vw] not-italic">
              <div className="flex items-center gap-[2vw]">
                <div className="p-[3vw]  max-sm:w-[8vw] w-[5vw]  max-sm:h-[8vw] h-[5vw] flex items-center justify-center aspect-square flex-shrink-0 bg-white/5 rounded-full">
                  <span className="max-sm:text-[4vw] text-[2vw] leading-[1.1] font-medium font-robert">
                    M
                  </span>
                </div>
                <a href="mailto:relatshq@relats.com" className="max-sm:text-[3vw] text-[2vw] opacity-60 hover:opacity-100">
                  relatshq@relats.com
                </a>
              </div>
              <div className="flex items-center gap-[2vw]">
                <div className="p-[3vw] max-sm:w-[8vw] w-[5vw]  max-sm:h-[8vw] h-[5vw] flex items-center justify-center aspect-square flex-shrink-0 bg-white/5 rounded-full">
                  <span className="max-sm:text-[4vw] text-[2vw] leading-[1.1] font-medium font-robert">
                    T
                  </span>
                </div>
                <a href="tel:+34938627510" className="max-sm:text-[3vw] text-[2vw] opacity-60 hover:opacity-100">
                  +34 93 862 7510
                </a>
              </div>
            </address>
          </div>
          <div className="flex py-[3vw] items-center justify-between w-full">

          <p className="max-sm:text-[2.5vw] text-[1.2vw] w-fit leading-[1.1] font-medium font-DMMono mt-[2vw]">
            RELATS © 2025
          </p>
          <div onClick={handleTopScroll} className="flex -rotate-90 group cursor-pointer gap-[2vw] mt-[2vw]">
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
              className="inline ml-2 text-orange-500 align-middle"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
          </div>

        </div>
      </section>
    </>
  );
}
