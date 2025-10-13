"use client";
import Image from "next/image";
import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProductionMobile() {
  const [counter, setCounter] = useState(0);
  const sectionRef = useRef(null);
  const counterRef = useRef({ value: 0 });

  // Split counter into 3 digits, always padded to 3
  const digits = String(counter).padStart(3, "0").split("");

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    // GSAP timeline for counter animation on scroll, scrub enabled
    let ctx = gsap.context(() => {
      let tween = gsap.to(counterRef.current, {
        value: 500,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // when top of section hits 80% of viewport
          end: "top 0%",    // when top of section hits top of viewport
          scrub: true,
        },
        onUpdate: () => {
          setCounter(Math.round(counterRef.current.value));
        },
      });

      // Reset counter when leaving (optional, comment out to hold at 500)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 0%",
        onLeaveBack: () => setCounter(0),
      });

      return () => {
        tween.kill();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }, sectionRef);

    // Cleanup
    return () => ctx.revert();
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
