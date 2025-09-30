"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Production() {
  const imageContainerRef = useRef(null);
  const [counter, setCounter] = useState(0);

  // Split counter into 3 digits, always padded to 3
  const digits = String(counter).padStart(3, "0").split("");

  useEffect(() => {
    const el = imageContainerRef.current;
    if (!el) return;

    let obj = { value: 0 };
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#production",
        start: "0% 50%",
        end: "90% 100%",
        scrub: 1.5,
        markers: false,
        onUpdate: (self) => {
          setCounter(Math.round(obj.value));
        },
      },
    });

    tl.to(el, {
      width: "130%",
      borderRadius: "0vw",
      height: "130%",
    });
    tl.to(
      ".text-production",
      {
        y: "0%",
        ease: "power2.inOut",
      },
      "<"
    );
    tl.to(
      obj,
      {
        value: 500,
        duration: .6,
        onUpdate: () => {
          setCounter(Math.round(obj.value));
        },
      },
      "<+.2"
    );
 

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="production"
      className="h-[500vh]  bg-background relative w-screen"
    >
      <div className="h-screen overflow-hidden w-full flex items-center justify-center sticky top-0">
        <div
          ref={imageContainerRef}
          className="z-[1] flex  items-center overflow-hidden relative justify-center"
          style={{ width: "25%", height: "40%" , borderRadius: "1.5vw"}}
        >
          <Image
            className="h-full w-full object-cover"
            src={"/assets/img/sustainability.jpg"}
            alt="production"
            fill
            priority
          />
        </div>
        <div className=" w-full h-full absolute top-0 left-0 z-[2] flex items-center justify-center">
          <div className="text-center text-production translate-y-[180%]">
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
