"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

export default function ProductionMobile() {
  const [counter, setCounter] = useState(0);
  const sectionRef = useRef(null);

  // Split counter into 3 digits, always padded to 3
  const digits = String(counter).padStart(3, "0").split("");

  useEffect(() => {
    let ticking = false;

    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;

      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Only trigger the counter when the section is at least partially in view
        if (rect.bottom > 0 && rect.top < windowHeight) {
          // How far through the section has the viewport traveled?
          // Progress: 0 when top of section at bottom of viewport,
          //           1 when bottom of section at top of viewport
          // We'll cap ["-20%" visible to "80%" viewport] as scroll range for animation
          const sectionHeight = rect.height;
          const scrollStart = windowHeight - sectionHeight * 0.2;
          const scrollEnd = 0 + sectionHeight * 0.8;
          const rawProgress = (scrollStart - rect.top) / (scrollStart - scrollEnd);
          const progress = clamp(rawProgress, 0, 1);

          // Animate from 0 to 500 according to scroll
          setCounter(Math.round(progress * 500));
        } else {
          setCounter(0);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // Initial call in case already in view
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      id="production"
      ref={sectionRef}
      className="h-screen hidden max-md:block bg-background relative w-screen overflow-x-hidden"
    >
      <div className="h-screen overflow-hidden w-full flex items-center justify-center sticky top-0">
        <div
          className="z-[1] flex items-center h-full w-full overflow-hidden relative justify-center"
        >
          <Image
            className="h-full w-full object-cover"
            src={"/assets/img/sustainability.jpg"}
            alt="production"
            fill
            priority
          />
          {/* Added overlay layer */}
          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        </div>
        <div className=" w-full h-full absolute top-0 left-0 z-[2] flex items-center justify-center">
          <div className="text-center w-full flex flex-col items-center justify-center text-production">
            <p className="max-sm:text-[8vw] text-[5vw]">Relats produces</p>
            <h2 className="max-sm:text-[15vw] text-[10vw] font-semibold">
              1{digits[0]}
              {digits[1]},{digits[2]}00,000
            </h2>
            <p className="max-sm:text-[6vw] text-[3.5vw] leading-none w-[50%]  font-medium">meters of sleeving per year</p>
          </div>
        </div>
      </div>
    </section>
  );
}
