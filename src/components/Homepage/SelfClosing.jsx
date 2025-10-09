"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Industry data configuration
const INDUSTRIES = [
  {
    key: "Construction machines",
    label: "Construction machines",
    video: "https://toptier.relats.com/wp-content/themes/relats/videos/industries/construction.mp4",
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
    video: "https://toptier.relats.com/wp-content/themes/relats/videos/industries/hybrid.mp4",
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
    video: "https://toptier.relats.com/wp-content/themes/relats/videos/industries/buses.mp4",
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
    video: "https://toptier.relats.com/wp-content/themes/relats/videos/industries/railway.mp4",
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
    video: "https://toptier.relats.com/wp-content/themes/relats/videos/industries/agriculture.mp4",
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

const SCROLL_TRIGGERS = [
  { start: "30% top", end: "40% top", industry: "Construction machines" },
  { start: "40% top", end: "50% top", industry: "Hybrid & Electric" },
  { start: "50% top", end: "60% top", industry: "Buses & Trucks" },
  { start: "60% top", end: "70% top", industry: "Railway" },
  { start: "70% top", end: "80% top", industry: "Agriculture machines" },
];

export default function SelfClosing() {
  // Refs
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const activeVideoRef = useRef(null);
  const activeImageRef = useRef(null);
  const dataCardsRef = useRef(null);
  const translationOverallRef = useRef(null);
  const prevIndustryRef = useRef("");
  const cardAnimationRefs = useRef([]);

  // State
  const [activeIndustry, setActiveIndustry] = useState("");

  const activeIndustryObj = INDUSTRIES.find((ind) => ind.key === activeIndustry);

  // Helper: Calculate scroll position for trigger
  const getScrollYForTrigger = (elem, triggerValue) => {
    if (!elem || typeof triggerValue !== "string") return 0;
    
    const [percent, align] = triggerValue.split(" ");
    const pct = parseFloat(percent) / 100;
    const rect = elem.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const elemTop = rect.top + scrollTop;
    const elemHeight = rect.height;
    
    if (align === "top") return elemTop + elemHeight * pct;
    if (align === "bottom") return elemTop + elemHeight * pct - window.innerHeight;
    return elemTop;
  };

  // Helper: Clamp scroll position
  const clampScrollY = (y) => {
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    return Math.min(Math.max(0, y), maxScroll);
  };

  // Helper: Calculate vertical position for overall container
  const calculateVerticalPosition = (idx) => {
    const minY = -50; // Start at top
    const maxY = 0;   // End at bottom
    const totalSteps = INDUSTRIES.length - 1;
    return minY + ((maxY - minY) * idx) / totalSteps;
  };

  // Animate cards on industry change
  const animateCards = (activeIdx) => {
    // Kill running animations
    cardAnimationRefs.current.forEach((tl) => tl?.kill?.());
    cardAnimationRefs.current = [];

    // Animate all cards
    cardRefs.current.forEach((ref, i) => {
      if (!ref) return;
      
      gsap.killTweensOf(ref);
      const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
      
      if (i === activeIdx) {
        tl.to(ref, { zIndex: 10, height: "auto", ease: "none", duration: 0.25 });
      } else {
        tl.to(ref, { zIndex: 1, height: "68px", ease: "none", duration: 0.25 });
      }
      
      cardAnimationRefs.current.push(tl);
    });
  };

  // Animate data cards vertical position
  const animateDataCards = (idx) => {
    if (!dataCardsRef.current) return;
    
    gsap.killTweensOf(dataCardsRef.current);
    gsap.to(dataCardsRef.current, {
      yPercent: -20 * idx,
      duration: 0.2,
      ease: "none",
      overwrite: "auto",
    });
  };

  // Animate overall container vertical position
  const animateOverallContainer = (idx) => {
    if (!translationOverallRef.current) return;
    
    gsap.killTweensOf(translationOverallRef.current);
    gsap.to(translationOverallRef.current, {
      yPercent: calculateVerticalPosition(idx),
      duration: 0.8,
      ease: "power2.out",
      overwrite: true,
    });
  };

  // Scroll to industry
  const scrollToIndustry = useCallback((industryKey) => {
    if (!containerRef.current) return;
    
    const trigger = SCROLL_TRIGGERS.find((t) => t.industry === industryKey);
    if (!trigger) return;
    
    const scrollY = clampScrollY(getScrollYForTrigger(containerRef.current, trigger.start));
    gsap.to(window, {
      scrollTo: { y: scrollY, autoKill: true },
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  // Handle card activation
  const handleCard = (industryKey, idx) => {
    console.log("handleCard", industryKey, idx);
    if (prevIndustryRef.current === industryKey) return; 
    prevIndustryRef.current = industryKey;
    
    animateDataCards(idx);
    animateOverallContainer(idx);
    
    setActiveIndustry(industryKey);
    animateCards(idx);
  };


  const ActualHandleCard = (industryKey, idx) => {
    scrollToIndustry(industryKey);
  }

  // Effect: Animate active industry video and image
  useEffect(() => {
    if (!activeIndustry || !activeVideoRef.current || !activeImageRef.current) return;

    gsap.fromTo(activeVideoRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "none" });
    gsap.fromTo(activeImageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "none" });
  }, [activeIndustry]);

  // Effect: Initialize card positions
  useEffect(() => {
    const activeIdx = INDUSTRIES.findIndex((ind) => ind.key === activeIndustry);

    INDUSTRIES.forEach((industry, idx) => {
      const ref = cardRefs.current[idx];
      if (!ref) return;
      
      gsap.killTweensOf(ref);
      if (industry.key === activeIndustry) {
        gsap.set(ref, { zIndex: 10, height: "auto" });
      } else {
        gsap.set(ref, { zIndex: 1, height: "68px" });
      }
    });

    if (dataCardsRef.current) {
      gsap.killTweensOf(dataCardsRef.current);
      gsap.set(dataCardsRef.current, { yPercent: activeIdx >= 0 ? -20 * activeIdx : 0 });
    }

    if (translationOverallRef.current) {
      gsap.killTweensOf(translationOverallRef.current);
      const yPercent = activeIdx >= 0 ? calculateVerticalPosition(activeIdx) : -50;
      gsap.set(translationOverallRef.current, { yPercent });
    }
  }, []);

  // Effect: Video scroll animation
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "30% top",
      scrub: true,
      onUpdate: (self) => {
        if (video.duration) {
          video.currentTime = video.duration * self.progress;
        }
      },
    });

    return () => st.kill();
  }, []);

  // Effect: Text and closing images animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation
      const chars = gsap.utils.toArray(".text-self-closing");
      gsap.set(chars, { opacity: 0 });

      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "25% top",
          scrub: true,
        },
      });

      textTl.to(chars, { opacity: 1, stagger: 0.06, ease: "none", duration: 0.5 }, 0);
      textTl.to(chars, { opacity: 0, stagger: 0.06, ease: "none", duration: 0.5 }, "+=0.5");

      // Closing images animation
      const closingImagesTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "25% top",
          end: "30% top",
          scrub: true,
        },
      });
      closingImagesTl.to(".closing-images-container", { opacity: 1, ease: "none", duration: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Effect: Industry scroll triggers
  useEffect(() => {
    if (!containerRef.current) return;

    if (translationOverallRef.current) {
      gsap.set(translationOverallRef.current, { yPercent: -50 });
    }

    const triggers = SCROLL_TRIGGERS.map(({ start, end, industry }) => {
      const idx = INDUSTRIES.findIndex((ind) => ind.key === industry);
      return ScrollTrigger.create({
        trigger: containerRef.current,
        start,
        end,
        onEnter: () => handleCard(industry, idx),
        onEnterBack: () => handleCard(industry, idx),
      });
    });

    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  return (
    <section id="self-closing" className="w-full h-[1300vh] max-md:hidden" ref={containerRef}>
      <div className="h-screen w-full overflow-hidden sticky top-0">
        <video
          ref={videoRef}
          src="/assets/videos/combo/self-closing.mp4"
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
        />
        
        <h2 className="heading2 w-[60%] max-md:text-[11.5vw] scale-65 text-center absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-white text-self-closing">
          We make mobility safer <br /> across all industries
        </h2>
        
        <div className="w-full closing-images-container h-full absolute inset-0 z-[1] opacity-0">
          {/* Background Video */}
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
            />
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
          
          {/* Content Overlay */}
          <div className="w-full h-full bg-blackshade/20 absolute flex inset-0 z-[5]">
            {/* Left Side - Industry Cards */}
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
            
            {/* Right Side - Data Cards */}
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
                  {INDUSTRIES.map((industry) => (
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
                        <p className="leading-[1.1] font-medium uppercase">Abrasion resistance</p>
                        <div className="bg-white overflow-hidden pl-[7vw] relative w-fit text-blackshade px-[.5vw] rounded-full">
                          <p>{industry.data.abrasion}</p>
                          <p className="absolute px-[1vw] rounded-full left-[0vw] bg-orange-600 top-0">
                            {industry.data.abrasionStandard}
                          </p>
                        </div>
                        <div className="flex items-center gap-[1vw] font-medium">
                          <p className="uppercase">Available in</p>
                          {industry.data.availableColors.map((color, idx) => (
                            <span
                              key={color + idx}
                              className={`w-[.8vw] h-[.8vw] bg-${color} rounded-full`}
                            />
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