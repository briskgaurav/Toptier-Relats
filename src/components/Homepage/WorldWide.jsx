"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

const stats = [
  {
    label: "Presence in",
    value: "4",
    sublabel: "continents",
  },
  {
    label: "Clients in",
    value: "55",
    sublabel: "countries",
  },
  {
    label: "Manufacturing in",
    value: "5 production",
    sublabel: "plants",
  },
  {
    label: "Employing",
    value: "1200+",
    sublabel: "people",
  },
];

export default function WorldWide() {
  // Refs for all overflow-translateText elements (desktop)
  const overflowRefs = useRef([]);
  // Refs for all mobile stat value+sublabel containers
  const mobileStatRefs = useRef([]);

  useEffect(() => {
    // Animate each overflow-translateText (desktop) with SplitText by lines
    overflowRefs.current.forEach((el) => {
      if (!el) return;
      // Split text into lines
      let split = new SplitText(el, { type: "lines", mask:true });
      gsap.set(split.lines, { yPercent: 100, opacity: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "top 60%",
        onEnter: () => {
          gsap.to(split.lines, {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
          });
        },
        once: true,
        onLeaveBack: () => {
          gsap.set(split.lines, { yPercent: 100, opacity: 0 });
        },
      });
    });

    // Animate each mobile stat value+sublabel (mobile) with SplitText by lines
    mobileStatRefs.current.forEach((el) => {
      if (!el) return;
      let split = new SplitText(el, { type: "lines", mask:true });
      gsap.set(split.lines, { yPercent: 100, opacity: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        end: "top 70%",
        onEnter: () => {
          gsap.to(split.lines, {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
          });
        },
        once: true,
        onLeaveBack: () => {
          gsap.set(split.lines, { yPercent: 100, opacity: 0 });
        },
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      // Optionally revert SplitText (if needed)
      overflowRefs.current.forEach((el) => {
        if (el && el.splitText) el.splitText.revert();
      });
      mobileStatRefs.current.forEach((el) => {
        if (el && el.splitText) el.splitText.revert();
      });
    };
  }, []);

  return (
    <section className="w-full relative overflow-hidden h-[110vh] px-[3vw] py-[5vw] flex max-md:flex-col max-md:py-[10vw] bg-[#1D1D1D]">
      <div className="w-1/2 max-md:w-full flex flex-col max-md:items-center max-md:justify-start items-start justify-between space-y-[2vw] h-full ">
        <div className="max-md:w-full max-md:flex max-md:justify-center max-md:items-center max-md:flex-col max-md:space-y-[5vw]">
          <h2 className="heading2 max-sm:!text-[10vw] max-md:text-[5vw] max-md:text-center max-md:w-[60%] w-[50%`]">
            Innovating worldwide
          </h2>
          <p className="content2 max-sm:!text-[5vw] max-md:!text-[2.5vw] max-md:w-[100%] max-md:text-center w-[70%] opacity-60">
            Relats is ahead of the curve in achieving sustainable change across
            the globe.
          </p>
        </div>
        <div className="w-full max-md:hidden flex gap-[1vw]">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex min-w-[13vw] h-fit items-start gap-[5vw] flex-col bg-white/15 rounded-[1.5vw] p-[1.5vw] "
            >
              <p className="text-[1vw] opacity-80 leading-[1.1] ">{stat.label}</p>
              <div className="text-[1.5vw] leading-[1.1] font-medium font-robert">
                <p
                  className="overflow-translateText "
                  ref={(el) => {
                    overflowRefs.current[idx * 2] = el;
                    if (el) el.splitText = new SplitText(el, { type: "lines", mask:true });
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="overflow-translateText"
                  ref={(el) => {
                    overflowRefs.current[idx * 2 + 1] = el;
                    if (el) el.splitText = new SplitText(el, { type: "lines", mask:true });
                  }}
                >
                  {stat.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[50%] max-md:absolute max-md:inset-0 max-md:w-full h-full flex items-center max-md:scale-120 justify-center">
        <Image
          src="/assets/img/worldwide/world.svg"
          alt="WorldWide"
          width={1000}
          height={1000}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full flex-col max-md:flex-wrap max-md:flex-row max-md:justify-center max-md:items-center max-sm:gap-[4vw] gap-[1vw] hidden max-md:flex mt-[8vw]">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-between min-w-[30vw] h-fit gap-[2vw] bg-white/15 backdrop-blur-[10px] rounded-[4vw] max-sm:p-[6vw] max-md:p-[3vw] p-[6vw] max-md:h-[18vh] max-sm:h-[17vh] max-sm:w-[45%] max-md:w-[24%] max-md:min-w-[23%] max-sm:min-w-[30vw]"
          >
            <p className=" max-md:text-left text-white opacity-80 max-sm:text-[3vw] max-md:text-[2vw] text-[3vw] leading-[1.1] w-full">
              {stat.label}
            </p>
            <div
              className="text-[6vw] w-full leading-[1.1] font-medium font-robert text-center max-md:text-left max-sm:text-[6vw] max-md:text-[2.5vw]"
              ref={(el) => {
                mobileStatRefs.current[idx] = el;
                if (el) el.splitText = new SplitText(el, { type: "lines" });
              }}
            >
              <p className="text-[5vw] max-sm:text-[5vw] text-white max-md:text-[3.5vw]">
                {stat.value} {stat.sublabel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
