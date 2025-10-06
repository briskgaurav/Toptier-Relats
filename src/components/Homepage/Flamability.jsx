"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { splitTextByChars } from "@/Animation/GsapAnimation";
import CableTypes from "./CableTypes";
import useVideoScroll from "@/Animation/UseVideoScroll";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);

export default function Flamability() {
  const [type, setType] = useState("revitex-wsx45");
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  // Cable type keys in the order to show
  const cableTypeOrder = [
    "revitex-wsx45",
    "revitex-vsc25",
    "revitex-vsctf"
  ];

  // The trigger values for each cable type section
  const cableTypeTriggerValues = {
    "revitex-wsx45": { start: "50% top" },
    "revitex-vsc25": { start: "65% top" },
    "revitex-vsctf": { start: "80% top" },
  };

  // Helper to clamp scrollY to the document's scrollable range
  function clampScrollY(y) {
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
    return Math.min(Math.max(0, y), maxScroll);
  }

  function getScrollYForTrigger(triggerElem, triggerValue) {
    // Only supports "X% top" or "X% bottom" for this use case
    if (!triggerElem || typeof triggerValue !== "string") return 0;
    const [percent, align] = triggerValue.split(" ");
    const pct = parseFloat(percent) / 100;
    const rect = triggerElem.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const elemTop = rect.top + scrollTop;
    const elemHeight = rect.height;
    if (align === "top") {
      return elemTop + elemHeight * pct - 0; // 0 = window's top
    } else if (align === "bottom") {
      return elemTop + elemHeight * pct - window.innerHeight;
    }
    // fallback
    return elemTop;
  }

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const cleanup = useVideoScroll({ video, container, triggerValues: { start: "top top", end: "50% top" } });

    return cleanup;
  }, []);

  useEffect(() => {
    let splittedText, splittedText2, splittedText3;
    let tl;

    const ctx = gsap.context(() => {
      // Set initial state
      splittedText = splitTextByChars(".flameText");
      splittedText2 = splitTextByChars(".flamabilityText");
      splittedText3 = splitTextByChars(".insulationText");
      gsap.set(splittedText.chars, { opacity: 0 });
      gsap.set(splittedText2.chars, { opacity: 0 });
      gsap.set(splittedText3.chars, { opacity: 0 });
      gsap.set(".cable-types", { opacity: 0 });

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "30% top",
          scrub: true,
          markers: false,
        },
      });

      tl.to(
        splittedText.chars,
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          duration: 0.5,
        },
        0
      );

      tl.to(
        splittedText.chars,
        {
          opacity: 0,
          stagger: 0.06,
          ease: "none",
          duration: 0.5,
        },
        "+=0.5"
      );

      // Animate in FLAMABILITY
      tl.to(
        splittedText2.chars,
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          duration: 0.5,
        },
        "+=0.2"
      );

      // Animate out FLAMABILITY
      tl.to(
        splittedText2.chars,
        {
          opacity: 0,
          stagger: 0.06,
          ease: "none",
          duration: 0.5,
        },
        "+=0.5"
      );

      // Animate in INSULATION
      tl.to(
        splittedText3.chars,
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          duration: 0.5,
        },
        "+=0.2"
      );

      // Animate out INSULATION
      tl.to(
        splittedText3.chars,
        {
          opacity: 0,
          stagger: 0.06,
          ease: "none",
          duration: 0.5,
        },
        "+=0.5"
      );

    }, containerRef);

    timelineRef.current = tl;

    const cableOpacityTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "45% top",
        end: "50% top",
        scrub: true,
        markers: false,
      },
    });
    cableOpacityTl.to(".cable-types", {
      opacity: 1,
      ease: "none",
      duration: 0.5,
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.scrollTrigger &&
          timelineRef.current.scrollTrigger.kill();
        timelineRef.current.kill();
      }
      if (splittedText) splittedText.revert();
      if (splittedText2) splittedText2.revert();
      ctx.revert();
    };
  }, []);

  // CABLES ANIMATION: set cable type on scroll, one by one, using GSAP scroll triggers for each range
  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up previous triggers
    let triggers = [];

    // Helper: set cable type only if changed
    let lastType = null;
    const setCableType = (idx) => {
      const cableKey = cableTypeOrder[idx];
      if (cableKey && cableKey !== lastType) {
        setType(cableKey);
        lastType = cableKey;
      }
    };

    // First cable: 50% - 65% (active first one)
    triggers.push(
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "50% top",
        end: "65% bottom",
        scrub: true,
        marker: true,
        onEnter: () => {
          setCableType(0);
        },
        onEnterBack: () => {
          setCableType(0);
        },
      })
    );

    // Second cable: 65% - 80% (active second one)
    triggers.push(
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "65% top",
        end: "80% bottom",
        scrub: true,
        marker: false,
        onEnter: () => {
          setCableType(1);
        },
        onEnterBack: () => setCableType(1),
      })
    );

    // Third cable: 80% - 95% (active third one)
    triggers.push(
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "80% top",
        end: "95% bottom",
        scrub: true,
        marker: false,
        onEnter: () => {
          setCableType(2);
        },
        onEnterBack: () => setCableType(2),
      })
    );

    setCableType(0);

    return () => {
      triggers.forEach((st) => st && st.kill && st.kill());
    };
  }, []);

  // Function to scroll to the trigger position of a cable by id
  // You can use this function on different cable buttons: handleScrollToCable("revitex-vsc25")
  const handleScrollToCable = useCallback((cableId) => {
    if (!containerRef.current) return;
    const triggerValue = cableTypeTriggerValues[cableId]?.start;
    if (!triggerValue) return;
    const scrollY = clampScrollY(getScrollYForTrigger(containerRef.current, triggerValue));
    gsap.to(window, { scrollTo: scrollY, duration: 1, ease: "power2.inOut" });
  }, []);

  // For backward compatibility, keep the old handleScrollToActiveCable for CableTypes
  const handleScrollToActiveCable = useCallback(() => {
    handleScrollToCable(type);
  }, [type, handleScrollToCable]);

  return (
    <section
    data-more-perflix-toggle
    data-toggleon
      id="flamability"
      ref={containerRef}
      className="w-full relative h-[1500vh]"
    >
      <div className="w-full h-screen sticky top-0 ">
        <video
          className="w-full h-full object-cover absolute inset-0 z-[1]"
          ref={videoRef}
          src="/assets/videos/revitex/busbar.mp4"
          muted
          playsInline
        />
        <div className="h-full w-full flex items-center flex-col justify-center relative z-[2]">
          <p className="text-white text-[12vw] flameText w-[52%] tracking-tighter leading-none font-medium font-robert">
            Up to{" "}
          </p>
          <p className="text-white text-[12vw] flameText w-[52%] text-right tracking-tighter leading-none font-medium font-robert">
            1,000°C
          </p>
          <p className="text-white text-[12vw] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flamabilityText text-center w-full tracking-tighter leading-none font-medium font-robert">
            Flammability
          </p>
          <div className="w-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center flex-col gap-[1vw]">
            <p className="text-white text-[12vw] w-[52%] tracking-tighter leading-none font-medium font-robert insulationText">
              Electrical
            </p>
            <p className="text-white text-[12vw]  w-[52%] text-right tracking-tighter leading-none font-medium font-robert insulationText">
              Insulation
            </p>
          </div>

          <CableTypes
            handleScrollToActiveCable={handleScrollToActiveCable}
            handleScrollToCable={handleScrollToCable}
            type={type}
            setType={setType}
          />
        </div>
      </div>
    </section>
  );
}
