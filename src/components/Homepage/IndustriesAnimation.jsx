"use client";
import React, { useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function IndustriesAnimation({ activeIndustry, setActiveIndustry, containerRef }) {
    useEffect(() => {
        if (!containerRef.current) return;
        const headingBoxes = document.querySelectorAll(".headingBox");
        const imageBoxes = document.querySelectorAll(".image-boxes");
        
        // Set all headings offscreen with will-change for performance
        gsap.set(headingBoxes, { 
            yPercent: 100,
            force3D: true,
            willChange: 'transform'
        });
        
        // Set proper z-index and initial states for all imageBoxes
        imageBoxes.forEach((box, idx) => {
            gsap.set(box, {
                clipPath: idx === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                zIndex: idx + 1, // Start with proper stacking order
                force3D: true,
                willChange: 'clip-path'
            });
        });

        // Initial animation timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "40% 0%",
                end: "50% 50%",
                scrub: 1, // Added slight smoothing
                markers: false,
            },
        });

        tl.to(".blackContainer", {
            opacity: 1,
            ease: "power2.inOut",
        });
        tl.to(
            ".inner-containers",
            {
                translateY: 0,
                ease: "power2.inOut",
                force3D: true
            },
            "<"
        );

        const transitions = [
            { start: "50% top", end: "55%", fromIdx: 0, toIdx: 1, headingYPercent: 0 },
            { start: "55% top", end: "60%", fromIdx: 1, toIdx: 2, headingYPercent: -150 },
            { start: "60% top", end: "65%", fromIdx: 2, toIdx: 3, headingYPercent: -250 },
            { start: "65% top", end: "70%", fromIdx: 3, toIdx: 4, headingYPercent: -400 },
            { start: "70% top", end: "85%", fromIdx: 4, toIdx: 5, headingYPercent: -500 },
            { start: "85% top", end: "90%", fromIdx: 5, toIdx: 6, headingYPercent: -600 },
        ];

        transitions.forEach((transition) => {
            const transitionTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: transition.start,
                    end: transition.end,
                    scrub: true, // Added slight smoothing for smoother transitions
                    markers: false,
                    onEnter: () => {
                        setActiveIndustry(industries[transition.toIdx].name);
                    },
                    onLeaveBack: () => {
                        setActiveIndustry(industries[transition.fromIdx].name);
                    }
                },
            });
            
            // Animate headings
            transitionTl.to(headingBoxes, {
                yPercent: transition.headingYPercent,
                ease: 'none',
                force3D: true
            });

            // Animate image reveal with proper z-index management
            transitionTl.to(imageBoxes[transition.toIdx], {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: 'none',
                force3D: true,
                onStart: () => {
                    // Ensure the incoming image is on top
                    gsap.set(imageBoxes[transition.toIdx], { 
                        zIndex: 10 + transition.toIdx 
                    });
                },
                onComplete: () => {
                    // Reset z-index of previous images to maintain proper stacking
                    imageBoxes.forEach((box, idx) => {
                        if (idx < transition.toIdx) {
                            gsap.set(box, { zIndex: idx + 1 });
                        } else if (idx === transition.toIdx) {
                            gsap.set(box, { zIndex: 10 + idx });
                        }
                    });
                }
            }, "<");
        });

      
    }, []);

    return (
        <div className="w-full h-screen flex px-[3vw] pb-[4vw] absolute inset-0 z-[3]">
            <div className="w-full h-full absolute top-0 left-0 blackContainer opacity-0 bg-[#252525]" />

            <div className="w-full h-full flex gap-[1.2vw] inner-containers translate-y-[100%] items-end justify-center">
                <div className="w-[42%] flex flex-col items-center justify-between text-blackshade h-[85%] py-[2vw] px-[1vw] bg-[#EAE4DF] rounded-[1.5vw]">
                    <p className="font-DMMono mt-[1vw] text-[.85vw] tracking-tight leading-[1.1] font-medium uppercase opacity-40">
                        OTHERS INDUSTRIES
                    </p>
                    <div className="overflow-hidden   space-y-[1vh] text-center h-fit w-full max-h-[calc(15vh+7vh)]">
                        {industries.map((industry) => (
                            <p
                                key={industry.name}
                                className={`content headingBox -translate-y-[-100%] h-[5vh] flex items-center justify-center transition-opacity duration-300 ${
                                    activeIndustry === industry.name ? "opacity-100" : "opacity-20"
                                }`}
                            >
                                {industry.name}
                            </p>
                        ))}
                    </div>
                    <div className="capitalize flex items-center justify-between w-full">
                        {industries.map((item) => (
                            <p
                                key={item.name}
                                className={`font-DMMono cursor-pointer text-[.75vw] leading-[1.1] translate-y-[-100%] font-medium buttons duration-300 transition-opacity uppercase ${
                                    activeIndustry === item.name ? "opacity-100" : "opacity-40"
                                }`}
                            >
                                {item.name}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="w-[58%] relative overflow-hidden h-[85%] rounded-[1.5vw]">
                    <div
                        className="w-full image-boxes relative overflow-hidden rounded-[1.5vw] h-full"
                        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    >
                        <Image
                            src={"/assets/img/industries/ovens.jpg"}
                            alt="periflex-emi"
                            fill
                            className="h-full w-full rounded-[1.5vw] object-cover"
                        />
                    </div>
                    {industries.slice(1).map((industry, idx) => (
                        <div
                            key={industry.name}
                            className="w-full image-boxes absolute bottom-0 left-0 overflow-hidden rounded-[1.5vw] h-full"
                            style={{ 
                                clipPath: "inset(100% 0% 0% 0%)",
                                zIndex: idx + 2
                            }}
                        >
                            <Image
                                src={industry.image}
                                alt={industry.name}
                                height={500}
                                width={500}
                                className="h-full relative w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const industries = [
    { name: "Ovens", image: "/assets/img/industries/ovens.jpg" },
    { name: "Vitroceramics", image: "/assets/img/industries/vitroceramics.jpg" },
    { name: "Industrial", image: "/assets/img/industries/industrial-installations.jpg" },
    { name: "Heat", image: "/assets/img/industries/heat.jpg" },
    { name: "Electricity", image: "/assets/img/industries/electricity.jpg" },
    { name: "Electromagnetic", image: "/assets/img/industries/electromagnetic.jpg" },
    { name: "Robotics", image: "/assets/img/industries/robotics.jpg" },
];