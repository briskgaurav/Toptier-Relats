"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import useVideoScroll from "@/Animation/UseVideoScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { splitTextByChars } from "@/Animation/GsapAnimation";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const INDUSTRIES = [
  {
    key: "Construction machines",
    label: "Construction machines",
    video:
      "https://toptier.relats.com/wp-content/themes/relats/videos/industries/construction.mp4",
    image: "/assets/img/industries/plas8-na.png",
    data: {
      name: "PLAS8 NA",
      temperature: "-70ºC to +150ºC",
      abrasion: "Class 4 (4.000 - 14.999 cycles)",
      abrasionStandard: "ISO 6722-1",
      availableColors: ["orange-600", "blackshade"],
      icon: "/assets/img/revitex/icons/temperature.svg",
      feature: "Abrasion resistance",
    },
  },
  {
    key: "Hybrid & Electric",
    label: "Hybrid & Electric",
    video:
      "https://toptier.relats.com/wp-content/themes/relats/videos/industries/hybrid.mp4",
    image: "/assets/img/industries/revitex-vhg10.png",
    data: {
      name: "REVITEX VHG10",
      temperature: "-55ºC to +200ºC",
      abrasion: "Class 5 (15.000+ cycles)",
      abrasionStandard: "ISO 6722-2",
      availableColors: ["orange-600", "blackshade"],
      icon: "/assets/img/revitex/icons/temperature.svg",
      feature: "High voltage protection",
    },
  },
  {
    key: "Buses & Trucks",
    label: "Buses & Trucks",
    video:
      "https://toptier.relats.com/wp-content/themes/relats/videos/industries/buses.mp4",
    image: "/assets/img/industries/periflex-ps.png",
    data: {
      name: "PERIFLEX PS",
      temperature: "-40ºC to +180ºC",
      abrasion: "Class 3 (1.000 - 3.999 cycles)",
      abrasionStandard: "ISO 6722-3",
      availableColors: ["orange-600", "blackshade"],
      icon: "/assets/img/revitex/icons/temperature.svg",
      feature: "Flame retardant",
    },
  },
  {
    key: "Railway",
    label: "Railway",
    video:
      "https://toptier.relats.com/wp-content/themes/relats/videos/industries/railway.mp4",
    image: "/assets/img/industries/revitex-vsctf.png",
    data: {
      name: "REVITEX VSCTF",
      temperature: "-60ºC to +220ºC",
      abrasion: "Class 5 (15.000+ cycles)",
      abrasionStandard: "EN 50305",
      availableColors: ["orange-600", "blackshade"],
      icon: "/assets/img/revitex/icons/temperature.svg",
      feature: "Railway certified",
    },
  },
  {
    key: "Agriculture machines",
    label: "Agriculture machines",
    video:
      "https://toptier.relats.com/wp-content/themes/relats/videos/industries/agriculture.mp4",
    image: "/assets/img/industries/plas8-na2.png",
    data: {
      name: "PLAS8 NA2",
      temperature: "-50ºC to +130ºC",
      abrasion: "Class 2 (500 - 999 cycles)",
      abrasionStandard: "ISO 6722-4",
      availableColors: ["orange-600", "blackshade"],
      icon: "/assets/img/revitex/icons/temperature.svg",
      feature: "Eco-friendly",
    },
  },
];

const industryScrollTriggers = {
  "Construction machines": { start: "30% top" },
  "Hybrid & Electric": { start: "40% top" },
  "Buses & Trucks": { start: "50% top" },
  Railway: { start: "60% top" },
  "Agriculture machines": { start: "70% top" },
};

export default function SelfClosing() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [activeIndustry, setActiveIndustry] = useState("");
  const cardRefs = useRef([]);
  const activeVideoRef = useRef(null);
  const activeImageRef = useRef(null);
  const prevIndustryRef = useRef("");
  const dataCardsRef = useRef(null);
  const translationOverallRef = useRef(null);

  // Track running card animation to prevent conflicts
  const cardAnimationRefs = useRef([]);

  const activeIndustryObj = INDUSTRIES.find(
    (industry) => industry.key === activeIndustry
  );

  function clampScrollY(y) {
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
    return Math.min(Math.max(0, y), maxScroll);
  }

  function getScrollYForTrigger(triggerElem, triggerValue) {
    if (!triggerElem || typeof triggerValue !== "string") return 0;
    const [percent, align] = triggerValue.split(" ");
    const pct = parseFloat(percent) / 100;
    const rect = triggerElem.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const elemTop = rect.top + scrollTop;
    const elemHeight = rect.height;
    if (align === "top") {
      return elemTop + elemHeight * pct - 0;
    } else if (align === "bottom") {
      return elemTop + elemHeight * pct - window.innerHeight;
    }
    return elemTop;
  }

  // Helper to get index by industryKey
  const getIndustryIdx = (industryKey) =>
    INDUSTRIES.findIndex((ind) => ind.key === industryKey);

  // Scroll to industry section
  const handleScrollToIndustry = useCallback((industryKey) => {
    if (!containerRef.current) return;
    const triggerValue = industryScrollTriggers[industryKey]?.start;
    if (!triggerValue) return;
    const scrollY = clampScrollY(
      getScrollYForTrigger(containerRef.current, triggerValue)
    );
    gsap.to(window, {
      scrollTo: { y: scrollY, autoKill: true },
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  // Handle card click/scroll trigger
  const handleCard = (industryKey, idx) => {
    if (prevIndustryRef.current === industryKey) return;

    setActiveIndustry(industryKey);
    prevIndustryRef.current = industryKey;

    // Kill any running card animations to prevent conflicts
    if (cardAnimationRefs.current.length) {
      cardAnimationRefs.current.forEach((tl) => {
        if (tl && tl.kill) tl.kill();
      });
      cardAnimationRefs.current = [];
    }

    // Animate all cards in a single batch to avoid conflicts
    cardRefs.current.forEach((ref, i) => {
      if (ref) {
        // Kill any running tweens on this card
        gsap.killTweensOf(ref);

        // Use overwrite: "auto" to ensure no conflicts, but also batch in a timeline for atomicity
        const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
        if (i === idx) {
          tl.to(ref, {
            zIndex: 10,
            height: "auto",
            ease: "none",
            duration: 0.25,
          });
        } else {
          tl.to(ref, {
            zIndex: 1,
            height: "68px",
            ease: "none",
            duration: 0.25,
          });
        }
        cardAnimationRefs.current.push(tl);
      }
    });

    // Translate data cards by 20% per industry index
    if (dataCardsRef.current) {
      gsap.killTweensOf(dataCardsRef.current);
      gsap.to(dataCardsRef.current, {
        yPercent: -20 * idx,
        duration: 0.2,
        ease: "none",
        overwrite: "auto",
      });
    }

    // Translate translationOverallContainer from -10% to -60% based on idx (0 to 4)
    if (translationOverallRef.current) {
      gsap.killTweensOf(translationOverallRef.current);
      const minY = -10;
      const maxY = -60;
      const totalSteps = INDUSTRIES.length - 1;
      const y = minY + ((maxY - minY) * idx) / totalSteps;
      gsap.to(translationOverallRef.current, {
        yPercent: y,
        duration: 0.8,
        ease: "power2.out",
        overwrite: true, // Ensure this takes full control
      });
    }

    handleScrollToIndustry(industryKey);
  };

  // Smooth transition effect when activeIndustry changes
  useEffect(() => {
    if (!activeIndustry || !activeVideoRef.current || !activeImageRef.current)
      return;

    // Animate video transition
    gsap.fromTo(
      activeVideoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: "none" }
    );

    // Animate image transition
    gsap.fromTo(
      activeImageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: "none" }
    );
  }, [activeIndustry]);

  // Set initial state for cards, data cards, and translationOverallContainer
  useEffect(() => {
    INDUSTRIES.forEach((industry, idx) => {
      const ref = cardRefs.current[idx];
      if (ref) {
        gsap.killTweensOf(ref);
        if (industry.key === activeIndustry) {
          gsap.set(ref, {
            zIndex: 10,
            height: "auto",
          });
        } else {
          gsap.set(ref, {
            zIndex: 1,
            height: "68px",
          });
        }
      }
    });
    // Set initial translateY for data cards
    if (dataCardsRef.current) {
      gsap.killTweensOf(dataCardsRef.current);
      const idx = INDUSTRIES.findIndex(
        (ind) => ind.key === activeIndustry
      );
      gsap.set(dataCardsRef.current, {
        yPercent: idx >= 0 ? -20 * idx : 0,
      });
    }
    // Set initial translateY for translationOverallContainer
    if (translationOverallRef.current) {
      gsap.killTweensOf(translationOverallRef.current);
      const idx = INDUSTRIES.findIndex(
        (ind) => ind.key === activeIndustry
      );
      const minY = -10;
      const maxY = -60;
      const totalSteps = INDUSTRIES.length - 1;
      const y = idx >= 0 ? minY + ((maxY - minY) * idx) / totalSteps : minY;
      gsap.set(translationOverallRef.current, {
        yPercent: y,
      });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const cleanup = useVideoScroll({
      video,
      container,
      triggerValues: { start: "top top", end: "30% top" },
    });

    return cleanup;
  }, []);

  useEffect(() => {
    let splittedText, textTl;

    const ctx = gsap.context(() => {
      splittedText = splitTextByChars(".text-self-closing");

      gsap.set(splittedText.chars, { opacity: 0 });

      textTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "25% top",
          scrub: true,
          markers: false,
        },
      });

      textTl.to(
        splittedText.chars,
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          duration: 0.5,
        },
        0
      );

      textTl.to(
        splittedText.chars,
        {
          opacity: 0,
          stagger: 0.06,
          ease: "none",
          duration: 0.5,
        },
        "+=0.5"
      );

      const closingImagesTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "25% top",
          end: "30% top",
          scrub: true,
          markers: false,
        },
      });
      closingImagesTl.to(".closing-images-container", {
        opacity: 1,
        ease: "none",
        duration: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ScrollTrigger for industry sections (NO yPercent scrub animation anymore)
  useEffect(() => {
    if (!containerRef.current) return;

    const scrollTriggers = [
      {
        start: "30% top",
        end: "40% top",
        industryKey: "Construction machines",
      },
      {
        start: "40% top",
        end: "50% top",
        industryKey: "Hybrid & Electric",
      },
      {
        start: "50% top",
        end: "60% top",
        industryKey: "Buses & Trucks",
      },
      {
        start: "60% top",
        end: "70% top",
        industryKey: "Railway",
      },
      {
        start: "70% top",
        end: "80% top",
        industryKey: "Agriculture machines",
      },
    ];

    // Set initial value to -10% (fix: not -60%)
    if (translationOverallRef.current) {
      gsap.set(translationOverallRef.current, { yPercent: -10 });
    }

    // For industry card triggers
    const triggers = scrollTriggers.map(({ start, end, industryKey }) => {
      const idx = INDUSTRIES.findIndex((ind) => ind.key === industryKey);
      return ScrollTrigger.create({
        trigger: containerRef.current,
        start,
        end,
        onEnter: () => handleCard(industryKey, idx),
        onEnterBack: () => handleCard(industryKey, idx),
      });
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="self-closing" className="w-full h-[1300vh]" ref={containerRef}>
      <div className="h-screen w-full overflow-hidden sticky top-0">
        <video
          ref={videoRef}
          src="/assets/videos/combo/self-closing.mp4"
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
        ></video>
        <h2 className="heading2 w-[60%] scale-65 text-center absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-white text-self-closing">
          We make mobility safer <br /> across all industries
        </h2>
        <div className="w-full closing-images-container h-full absolute inset-0 z-[1] opacity-0">
          {/* Active Video Image */}
          <div className="w-full h-full overflow-hidden absolute inset-0">
            <video
              ref={activeVideoRef}
              key={activeIndustryObj?.video}
              src={activeIndustryObj?.video}
              className="w-full h-full blur-xl scale-150 object-cover"
              muted
              autoPlay
              playsInline
              loop
            ></video>
          </div>

          {/* Active Industry Image */}
          <div className="w-full h-full absolute inset-0">
            <div ref={activeImageRef} className="w-full h-full relative">
              <img
                key={activeIndustryObj?.image}
                src={activeIndustryObj?.image}
                alt={activeIndustryObj?.label || "industry"}
                className="w-full relative h-full z-[1] object-cover"
                
              />
            </div>
          </div>
          <div className="w-full h-full bg-blackshade/20  absolute flex inset-0 z-[5]">
            <div className="w-1/2 h-full relative z-[5] flex items-end justify-start pb-[3vw] px-[3vw]">
              <div className="container h-fit w-fit bg-white/10 border border-white/20 backdrop-blur-[5px] rounded-[1.5vw] overflow-hidden">
                {INDUSTRIES.map((industry, idx) => (
                  <div
                    key={industry.key}
                    ref={(el) => (cardRefs.current[idx] = el)}
                    className="w-[35vw] space-y-[2vw] overflow-hidden p-[1vw] px-[2vw] border border-white/20 origin-bottom cursor-pointer"
                    onClick={() => handleCard(industry.key, idx)}
                  >
                    <p className="content2">{industry.label}</p>
                    <div className="w-full overflow-hidden h-[15vw] rounded-[1.5vw]">
                      <video
                        src={industry.video}
                        className="w-full h-full object-cover"
                        muted
                        autoPlay
                        playsInline
                        loop
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2 relative text-white flex items-end justify-end p-[3vw] h-full">
              <div
                className="w-fit h-[39.5vh] rounded-[1.5vw] translationOverallContainer overflow-hidden relative"
                ref={translationOverallRef}
                style={{ willChange: "transform" }}
              >
                <div
                  className="w-fit rounded-[1.5vw] data-cards translate-y-[0%] h-fit"
                  ref={dataCardsRef}
                  style={{ willChange: "transform" }}
                >
                  {INDUSTRIES.map((industry, i) => (
                    <div
                      key={industry.key}
                      className="p-[2vw] space-y-[1vw] w-full bg-white/20 backdrop-blur-[10px] rounded-[1.5vw] border border-white/20 h-fit"
                    >
                      <p className="heading2 w-full">{industry.data.name}</p>
                      <div className="flex mt-[0vw] items-center gap-[1vw]">
                        <div className="w-[1.3vw] h-[1.3vw]">
                          <img
                            src={industry.data.icon}
                            alt={industry.data.feature}
                           
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p>{industry.data.feature}</p>
                      </div>
                      <p className="content2">{industry.data.temperature}</p>
                      <div className="font-DMMono space-y-[.8vw] font-medium text-[.8vw]">
                        <p className=" leading-[1.1] font-medium uppercase">
                          Abrasion resistance
                        </p>
                        <div className="bg-white overflow-hidden pl-[7vw] relative w-fit text-blackshade px-[.5vw] rounded-full">
                          <p className="">{industry.data.abrasion}</p>
                          <p className="absolute px-[1vw] rounded-full left-[0vw] bg-orange-600  top-0">
                            {industry.data.abrasionStandard}
                          </p>
                        </div>
                        <div className="flex items-center gap-[1vw] font-medium">
                          <p className="uppercase">Available in</p>
                          {industry.data.availableColors.map((color, idx) => (
                            <span
                              key={color + idx}
                              className={`w-[.8vw] h-[.8vw] bg-${color} rounded-full`}
                            ></span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </section>
  );
}
