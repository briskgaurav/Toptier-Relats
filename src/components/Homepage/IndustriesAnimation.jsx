"use client";
import React, { useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function IndustriesAnimation({ activeIndustry, setActiveIndustry, containerRef }) {
    const handleIndustryClick = (industryName, index) => {
        // Calculate the scroll position based on the industry index
        const scrollPercentages = [0.5, 0.55, 0.6, 0.65, 0.7, 0.85, 0.9];
        const targetPercentage = scrollPercentages[index];
        
        if (!containerRef.current) return;
        
        const containerTop = containerRef.current.offsetTop;
        const containerHeight = containerRef.current.offsetHeight;
        const targetScroll = containerTop + (containerHeight * targetPercentage);
        
        // Smooth scroll to the target position
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (!containerRef.current) return;
        const headingBoxes = document.querySelectorAll(".headingBox");
        const imageBoxes = document.querySelectorAll(".image-boxes");
        const subInfoContainers = document.querySelectorAll(".subInfoContainer");

        // Set all headings offscreen with will-change for performance
        gsap.set(headingBoxes, {
            yPercent: 0,
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
            { start: "50% top", end: "55%", fromIdx: 0, toIdx: 1, headingYPercent: -120 },
            { start: "55% top", end: "60%", fromIdx: 1, toIdx: 2, headingYPercent: -230 },
            { start: "60% top", end: "65%", fromIdx: 2, toIdx: 3, headingYPercent: -360 },
            { start: "65% top", end: "70%", fromIdx: 3, toIdx: 4, headingYPercent: -480 },
            { start: "70% top", end: "85%", fromIdx: 4, toIdx: 5, headingYPercent: -600 },
            { start: "85% top", end: "90%", fromIdx: 5, toIdx: 6, headingYPercent: -720 },
        ];

        transitions.forEach((transition) => {
            const transitionTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: transition.start,
                    end: transition.end,
                    scrub: true, // Added slight smoothing for smoother transitions
                    markers: false,
                },
            });

            // Animate headings
            transitionTl.to(headingBoxes, {
                yPercent: transition.headingYPercent,
                ease: 'linear',
                force3D: true
            });
            transitionTl.to(subInfoContainers, {
                yPercent: -100 * transition.toIdx,
                ease: 'linear',
                force3D: true
            }, "<");

            // Animate image reveal with proper z-index management
            transitionTl.to(imageBoxes[transition.toIdx], {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: 'linear',
                force3D: true,
                onStart: () => {
                    // Ensure the incoming image is on top
                    gsap.set(imageBoxes[transition.toIdx], {
                        zIndex: 10 + transition.toIdx
                    });
                    // Only set active industry if it's different
                    if (activeIndustry !== industries[transition.toIdx].name) {
                        setActiveIndustry(industries[transition.toIdx].name);
                    }
                },
                onReverseComplete: () => {
                    // When scrolling back, set the previous industry as active
                    // If we've scrolled back to the start, highlight the first industry (index 0)
                    if (transition.fromIdx === 0 && ScrollTrigger && ScrollTrigger.isScrolling()) {
                        setActiveIndustry(industries[0].name);
                    } else if (activeIndustry !== industries[transition.fromIdx].name) {
                        setActiveIndustry(industries[transition.fromIdx].name);
                    }
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

                },


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
                    <div className="overflow-hidden   space-y-[1vh] text-center h-fit w-full max-h-[calc(16vh)]">
                        {industries.map((industry) => (
                            <p
                                key={industry.name}
                                className={`content headingBox -translate-y-[-100%] h-[5vh] flex items-center justify-center transition-opacity duration-300 ${activeIndustry === industry.name ? "opacity-100" : "opacity-20"
                                    }`}
                            >
                                {industry.name}
                            </p>
                        ))}
                    </div>
                    <div className="capitalize flex items-center justify-between w-full">
                        {industries.map((item, idx) => (
                            <p
                                key={item.name}
                                onClick={() => handleIndustryClick(item.name, idx)}
                                className={`font-DMMono onclickIndustries cursor-pointer text-[.75vw] leading-[1.1] translate-y-[-100%] font-medium buttons duration-300 transition-opacity uppercase ${activeIndustry === item.name ? "opacity-100" : "opacity-40"
                                    }`}
                            >
                                {item.name}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="w-[58%] relative overflow-hidden h-[85%] rounded-[1.5vw]">
                    <div className='w-fit z-[500] overflow-hidden absolute bottom-[3vw] right-[3vw] bg-white/15  rounded-[1.2vw] backdrop-blur-[20px] h-[22.4vh] '>
                        {industriesData.map((item, idx) => (
                            <div key={idx} className='w-fit max-w-[25vw] subInfoContainer h-fit subInfoContainerTranslate space-y-[2vw]  p-[1.4vw]'>
                                <div className='w-[2.5vw] relative h-[2.5vw] overflow-hidden '>
                                    <Image src={item.img} alt={item.alt} fill className='w-full h-full object-cover' />
                                </div>
                                <p className='text-[1.2vw] '>{item.text}</p>
                            </div>
                        ))}
                    </div>
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

const industriesData = [
    {
        img: "https://toptier.relats.com/wp-content/themes/relats/img/industries/ovens.svg",
        alt: "ovens",
        text: "Relats' sleeves are engineered for safety and durability in high temperature environments."
    },
    {
        img: "https://toptier.relats.com/wp-content/themes/relats/img/industries/vitroceramics.svg",
        alt: "vitroceramics",
        text: "Specialized solutions for vitroceramic applications, ensuring optimal thermal protection."
    },
    {
        img: "https://toptier.relats.com/wp-content/themes/relats/img/industries/industrial-installations.svg",
        alt: "industrial",
        text: "Industrial installations benefit from Relats' robust and reliable insulation products."
    },
    {
        img: "https://toptier.relats.com/wp-content/themes/relats/img/industries/heat.svg",
        alt: "robotics",
        text: "Advanced protection for robotics and automation, supporting flexible and safe operation."
    },
    {
        img: "https://toptier.relats.com/wp-content/themes/relats/img/industries/electricity.svg",
        alt: "vitroceramics",
        text: "Specialized solutions for vitroceramic applications, ensuring optimal thermal protection."
    },
    {
        img: "https://toptier.relats.com/wp-content/themes/relats/img/industries/electromagnetic.svg",
        alt: "industrial",
        text: "Industrial installations benefit from Relats' robust and reliable insulation products."
    },
    {
        img: "https://toptier.relats.com/wp-content/themes/relats/img/industries/robotics.svg",
        alt: "robotics",
        text: "Advanced protection for robotics and automation, supporting flexible and safe operation."
    }
]