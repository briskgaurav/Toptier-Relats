"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Production() {
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const [counter, setCounter] = useState(0);

  // Split counter into 3 digits, always padded to 3
  const digits = String(counter).padStart(3, "0").split("");

  useEffect(() => {
    const el = imageContainerRef.current;
    const imgEl = imageRef.current;
    if (!el || !imgEl) return;

    let obj = { value: 0 };

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#production",
        start: "-2% 100%",
        end: "100% 240%",
        scrub: 1,
        markers: false,
        onUpdate: () => {
          setCounter(Math.round(obj.value));
        },
      },
    });

    // Use proportional inset (expanding from all sides to center)
    // Start with inset covering the same area as the circle, ending with inset(0%)
    // Calculate a starting inset value that reasonably matches the circle (~50% cover)
    tl.fromTo(
      el,
      {
        // large enough so that visual matches circle burst from center
        clipPath: "inset(50% 50% 50% 50% round 2vw)", // reveal from the center outward
 
      },
      {
        clipPath: "inset(0% 0% 0% 0% round 0vw)", 
        force3D: true,
        willChange: "clip-path, border-radius",
      },
      0
    );
    tl.fromTo(
      imgEl,
      {
        scale: 1,
      },
      {
        scale: 1.5,
        duration: 1,
        ease: "power1.inOut",
        willChange: "transform",
      },
      "<"
    );

    // Animate text sliding in
    tl.to(
      ".text-production",
      {
        y: "0%",
        ease: "power1.inOut",
        duration: 0.2,
      },
      "<+.4"
    );
    tl.to(
      obj,
      {
        value: 500,
        duration: 0.3,
        ease: "power1.inOut",
        onUpdate: () => setCounter(Math.round(obj.value)),
        onComplete: () => setCounter(Math.round(obj.value)),
      },
      "<+.3>"
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="production"
      className="h-[700vh] max-md:hidden bg-background relative w-screen"
    >
      <div className="h-screen overflow-hidden w-full flex items-center justify-center sticky top-0">
        <div
          ref={imageContainerRef}
          className="image --cover absolute left-[50%] origin-center top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          style={{
            // Proportional inset reveal, will be animated by gsap
            overflow: "hidden",
       
          }}
        >
          <img
            ref={imageRef}
            src="https://toptier.relats.com/wp-content/themes/relats/img/sustainability.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{
              scale: 1.13,
              transition: "scale 0.4s"
            }}
          />
        </div>
        <div className="w-full h-full absolute top-0 left-0 z-[2] flex items-center justify-center">
          <div className="text-center text-production translate-y-[220%]">
            <p className="content">Relats produces</p>
            <h2 className="heading">
              1{digits[0]}
              {digits[1]},{digits[2]}00,000
            </h2>
            <p className="content">meters of sleeving per year</p>
          </div>
        </div>
      </div>
    </section>
  );
}