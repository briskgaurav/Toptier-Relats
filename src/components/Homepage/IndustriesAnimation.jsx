"use client";
import React, { useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function IndustriesAnimation({ activeIndustry, setActiveIndustry, containerRef }) {
    const handleIndustryClick = (industryName, index) => {
        if (!containerRef.current) return;
        
        const scrollPercentages = [0.50, 0.5667, 0.6333, 0.70, 0.7667, 0.8333, 0.90];
        const containerTop = containerRef.current.offsetTop;
        const containerHeight = containerRef.current.offsetHeight;
        const targetScroll = containerTop + (containerHeight * scrollPercentages[index]);
        
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    };

    useEffect(() => {
        if (!containerRef.current) return;
        
        const headingBoxes = document.querySelectorAll(".headingBox");
        const imageBoxes = document.querySelectorAll(".image-boxes");
        const parallexImages = document.querySelectorAll(".parallex-image");
        const subInfoContainers = document.querySelectorAll(".subInfoContainer");

        // Initial setup
        gsap.set(headingBoxes, { yPercent: 0, force3D: true });
        imageBoxes.forEach((box, idx) => {
            gsap.set(box, {
                clipPath: idx === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0%  round 0vw)",
                width:'103%',
                xPercent:-1,
                force3D: true
            });
        });
        parallexImages.forEach((image, idx) => {
            gsap.set(image, {
               y:50,
            });
        });

        // Entry animation
        gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "40% 0%",
                end: "50% 50%",
                scrub: 1,
            },
        })
        .to(".blackContainer", { opacity: 1 })
        .to(".inner-containers", { translateY: 0, force3D: true }, "<");

        // Transitions - Equal 6.67% spacing
        const scrollSteps = ["50%", "56.67%", "63.33%", "70%", "76.67%", "83.33%", "90%"];
        const headingSteps = [0, -120, -230, -360, -480, -600, -720];

        for (let i = 0; i < 6; i++) {
            const start = scrollSteps[i];
            const end = scrollSteps[i + 1];
            const toIdx = i + 1;

            // Snap animations for text
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: `${start} top`,
                end: end,
                onEnter: () => {
                    gsap.to(headingBoxes, { yPercent: headingSteps[toIdx], duration: 0.5, ease: "power2.inOut", force3D: true });
                    gsap.to(subInfoContainers, { yPercent: -100 * toIdx, duration: 0.5, ease: "power2.inOut", force3D: true });
                    setActiveIndustry(industries[toIdx].name);
                },
                onEnterBack: () => {
                    gsap.to(headingBoxes, { yPercent: headingSteps[toIdx], duration: 0.5, ease: "power2.inOut", force3D: true });
                    gsap.to(subInfoContainers, { yPercent: -100 * toIdx, duration: 0.5, ease: "power2.inOut", force3D: true });
                    setActiveIndustry(industries[toIdx].name);
                },
                onLeaveBack: () => {
                    const prevIdx = i;
                    gsap.to(headingBoxes, { yPercent: headingSteps[prevIdx], duration: 0.5, ease: "power2.inOut", force3D: true });
                    gsap.to(subInfoContainers, { yPercent: -100 * prevIdx, duration: 0.5, ease: "power2.inOut", force3D: true });
                    setActiveIndustry(industries[prevIdx].name);
                }
            });

            // Scrub animation for images
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: `${start} top`,
                    end: end,
                    scrub: true,
                },
            }).to(imageBoxes[toIdx+1], { clipPath: "inset(0% 0% 0% round 1.5vw)", xPercent:0,width:'100%', ease: 'linear', force3D: true })
            .to(parallexImages, {  y:0, ease: 'none', force3D: true },"<");
        }

    // eslint-disable-next-line
    }, []);

    return (
        <div className="w-full h-screen flex px-[3vw] pb-[4vw] absolute inset-0 z-[3]">
            <div className="w-full h-full absolute top-0 left-0 blackContainer opacity-0 bg-[#252525]" />

            <div className="w-full h-full flex gap-[1.2vw] inner-containers translate-y-[100%] items-end justify-center">
                <div className="w-[42%] flex flex-col items-center justify-between text-blackshade h-[85%] py-[2vw] px-[1vw] bg-[#EAE4DF] rounded-[1.5vw]">
                    <p className="font-DMMono mt-[1vw] text-[.85vw] tracking-tight leading-[1.1] font-medium uppercase opacity-40">
                        OTHERS INDUSTRIES
                    </p>
                    <div className="overflow-hidden space-y-[1vh] text-center h-fit w-full max-h-[calc(16vh)]">
                        {industries.map((industry) => (
                            <p
                                key={industry.name}
                                className={`content headingBox translate-y-[100%] h-[5vh] flex items-center justify-center transition-opacity duration-300 ${
                                    activeIndustry === industry.name ? "opacity-100" : "opacity-20"
                                }`}
                            >
                                {industry.name}
                            </p>
                        ))}
                    </div>
                    <div className="capitalize px-[.5vw] flex items-center justify-between w-full">
                        {industries.map((item, idx) => (
                            <p
                                key={item.name}
                                onClick={() => handleIndustryClick(item.name, idx)}
                                className={`font-DMMono cursor-pointer text-[.68vw] leading-[1.1] font-medium duration-300 transition-opacity uppercase ${
                                    activeIndustry === item.name ? "opacity-100" : "opacity-40"
                                }`}
                            >
                                {item.name}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="w-[58%] relative overflow-hidden h-[85%] rounded-[1.5vw]">
                    <div className='w-fit z-[500] overflow-hidden absolute bottom-[3vw] right-[3vw] bg-white/15 rounded-[1.2vw] backdrop-blur-[20px] h-[22.4vh]'>
                        {industriesData.map((item, idx) => (
                            <div key={idx} className='w-fit max-w-[25vw] subInfoContainer h-fit space-y-[2vw] p-[1.4vw]'>
                                <div className='w-[2.5vw] relative h-[2.5vw] overflow-hidden'>
                                    <Image src={item.img} alt={item.alt} fill className='w-full h-full object-cover' />
                                </div>
                                <p className='text-[1.2vw]'>{item.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="w-full image-boxes relative overflow-hidden rounded-[1.5vw] h-full">
                        <Image
                            src={"/assets/img/industries/ovens.jpg"}
                            alt="periflex-emi"
                            fill
                            className="h-full w-full rounded-[1.5vw] object-cover"
                        />
                    </div>
                    {industries.map((industry, idx) => (
                        <div
                            key={industry.name}
                            className="w-full image-boxes absolute bottom-0 left-0  h-full"
                        >
                            <Image
                                src={industry.image}
                                alt={industry.name}
                                height={500}
                                width={500}
                                className="h-full parallex-image w-full object-cover"
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