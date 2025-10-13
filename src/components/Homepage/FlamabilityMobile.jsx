"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { splitTextByChars } from "@/Animation/GsapAnimation";
import CableTypes from "./CableTypes";
import useVideoScroll from "@/Animation/UseVideoScroll";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import UseMobile from "../UseMobile";
import CableTypesMobile from "./CableTypesMobile";
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);

export default function FlamabilityMobile() {
    const { isMobile } = UseMobile()
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

    const handleScrollToCable = useCallback((cableId) => {
        if (!containerRef.current) return;
        const triggerValue = cableTypeTriggerValues[cableId]?.start;
        if (!triggerValue) return;
        // const scrollY = clampScrollY(getScrollYForTrigger(containerRef.current, triggerValue));
        // gsap.to(window, { scrollTo: scrollY, duration: 1, ease: "power2.inOut" });
    }, []);

    // For backward compatibility, keep the old handleScrollToActiveCable for CableTypes
    const handleScrollToActiveCable = useCallback(() => {
        handleScrollToCable(type);
    }, [type, handleScrollToCable]);

    return (
        <>
            <section
                data-more-perflix-toggle
                data-toggleon
                id="flamability"
                ref={containerRef}
                className="w-full max-md:block hidden relative h-screen overflow-x-hidden"
            >
                <div className="w-full h-screen sticky top-0 ">
                    <video
                        className="w-full h-full object-cover absolute inset-0 z-[1]"
                        ref={videoRef}
                        src="/assets/videos/revitex/busbar.mp4"
                        muted
                        autoPlay
                        loop={false}
                        playsInline
                    />
                    <div className="h-full w-full flex items-center flex-col justify-between max-sm:py-[40vw] relative z-[2]">
                        <div className="w-full  max-md:pt-[15vw] max-sm:pt-[0vw] flex items-center flex-col justify-center gap-[20vw]">

                            <p className="text-white max-sm:text-[12vw] text-[5vw] flameText w-full text-center  tracking-tighter leading-none font-medium font-robert">
                                Up to 1,000ºC
                            </p>
                            <div className="w-full h-fit flex items-center justify-center px-[5vw] gap-[1vw]">
                                <span className="w-full h-[1px] bg-white/60"></span>
                                <span className="text-white/60">+</span>
                                <span className="w-full h-[1px] bg-white/60"></span>
                            </div>
                        </div>
                        <div className="w-full max-md:pt-[15vw] max-sm:pt-[0vw] flex items-center flex-col justify-center gap-[20vw]">

                            <p className="text-white max-sm:text-[12vw] text-[5vw] flameText w-full text-center  tracking-tighter leading-none font-medium font-robert">
                                Flammability
                            </p>
                            <div className="w-full h-fit flex items-center justify-center px-[5vw] gap-[1vw]">
                                <span className="w-full h-[1px] bg-white/60"></span>
                                <span className="text-white/60">+</span>
                                <span className="w-full h-[1px] bg-white/60"></span>
                            </div>
                        </div>
                        <div className="w-full max-md:pb-[15vw] max-sm:pt-[0vw] flex items-center flex-col justify-center ">

                            <p className="text-white max-sm:text-[12vw] text-[5vw] flameText w-full text-center  tracking-tighter leading-none font-medium font-robert">
                                Electrical Insulation
                            </p>
                        </div>




                    </div>
                </div>

            </section>
            <CableTypesMobile
                handleScrollToActiveCable={handleScrollToActiveCable}
                handleScrollToCable={handleScrollToCable}
                type={type}
                setType={setType}
            />
        </>
    );
}
