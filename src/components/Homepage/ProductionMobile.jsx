"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

export default function ProductionMobile() {
  const [counter, setCounter] = useState(0);
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  // Split counter into 3 digits, always padded to 3
  const digits = String(counter).padStart(3, "0").split("");

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Trigger animation when section enters viewport, only once
      if (
        !hasAnimated.current &&
        rect.top < windowHeight &&
        rect.bottom > 0
      ) {
        hasAnimated.current = true;
        // Animate counter from 0 to 500 quickly (no scrub)
        let start = 0;
        const end = 500;
        const duration = 700; // ms
        const startTime = performance.now();

        function animate(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.round(start + (end - start) * progress);
          setCounter(value);
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCounter(end);
          }
        }
        requestAnimationFrame(animate);
      } else if (rect.top >= windowHeight) {
        // Reset if scrolled above
        hasAnimated.current = false;
        setCounter(0);
      }
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
