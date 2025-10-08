"use client";
import React, { useEffect, useRef, useState } from "react";
import useVideoScroll from "@/Animation/UseVideoScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Cards from "./Cards";
import Image from "next/image";
import IndustriesAnimation from "./IndustriesAnimation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
gsap.registerPlugin(ScrollTrigger);

export default function PeriflexMobile() {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const periflexContainerRef = useRef(null);
    const [activeIndustry, setActiveIndustry] = useState("Ovens");

    return (
        <>
            <section
                id="periflex"
                ref={containerRef}
                className="w-full max-md:block hidden relative h-screen overflow-x-hidden"
            >
                <div className="w-full h-screen overflow-hidden sticky top-0">
                    <video
                        ref={videoRef}
                        src={
                            "/assets/videos/periflex/periflex.mp4"
                        }
                        className="w-full h-full object-cover"
                        muted
                        autoPlay
                        playsInline
                        loop
                    />
                    <div
                        ref={periflexContainerRef}
                        className="w-full h-screen flex flex-col-reverse absolute inset-0  z-[2] periflex-container"
                    >
                        <div className="w-[80%]  flex-col h-fit gap-[1vw] flex items-start pl-[7%] pb-[8.5%] justify-end ">
                            <h2 className="max-sm:text-[15vw] text-[8vw] leading-none font-medium text-white">Periflex <br /> DURA HA</h2>

                        </div>
                        <div className="w-[30%] max-sm:w-[50%]  h-full relative">
                            <Cards contentClassName="max-sm:text-[5vw] max-md:text-[3vw] max-sm:w-[70%] w-[100%]"
                                heading="Mechanical Production"
                                content="ISO 6722-1 (100.000 - 199.999 cycles)" 
                                headingClassName="max-md:text-[2vw] w-full"
                                positionClassName="right-[0%] w-[50%] max-sm:top-[80%] top-[85%] max-sm:translate-x-[85%] translate-x-[220%] -translate-y-1/2 absolute" />
                            <Cards contentClassName="max-sm:text-[8vw] text-[5vw] w-[80%]"
                                heading="Operating temperature"
                                headingClassName="max-sm:text-[2vw] w-full"
                                content="-70ºC to +125ºC" 
                                positionClassName="left-[10%] w-[50%] max-sm:top-[50%] top-[60%] -translate-x-0 -translate-y-1/2 absolute" />
                        </div>
                        <div className="w-full h-fit flex py-[10vw] items-center max-sm:justify-center max-sm:px-0 px-[4vw]">
                            <h2 className="max-sm:text-[8vw] text-[4vw] max-sm:w-[90%] w-[50%]  leading-none font-medium text-white">Ahead of the curve, everything it counts</h2>
                        </div>
                    </div>

                </div>
            </section>
            <section className="w-full h-fit bg-[#1d1d1d] flex-col items-center justify-center hidden py-[15vw] max-md:flex">
                <p className="font-DMMono max-sm:text-[2.6vw] text-[3vw] opacity-50 uppercase leading-[1.25] font-medium tracking-tighter text-center">OTHER INDUSTRIES</p>
            <div className="w-full mt-[8vw] max-sm:h-[70vh] max-md:h-[110vh]">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1.1}
                    className="h-full"
                    centeredSlides={true}
                    pagination={{ clickable: false }}
                >
                    {industries.map((industry, idx) => (
                        <SwiperSlide key={industry.name}>
                            <div className="flex flex-col items-center justify-center w-[100%] ml-[0vw] h-full relative rounded-[5vw] overflow-hidden ">
                             
                                <div className="absolute inset-0 z-[2] h-full w-full">
                                    <img
                                        src={industry.image}
                                        alt={industry.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute top-[15vw] flex px-[5vw] left-0  z-[5] h-fit gap-[2vw] w-full">
                                    <p className="max-sm:text-[8vw] text-[5vw] text-center w-full text-white">{industry.name}</p>
                                </div>
                                <div className="absolute z-[5] bottom-[5vw] left-1/2 -translate-x-1/2 rounded-xl px-6 py-[4vw] w-[90%] bg-white/20 backdrop-blur-[10px] border border-white/20 gap-[3vw] flex flex-col space-y-[2vw] text-white">
                                  <div className="w-[4vw] h-[4vw] ">
                                    <Image src={industry.icon} alt={industry.name} className="w-full h-full object-cover" width={100} height={100} />

                                  </div>
                                  <p className="max-sm:text-[4vw] text-[3.5vw]">{industry.text}</p>
                                    
                                  
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            </section>

        </>
    );
}



const industries = [
    {
        name: "Ovens",
        image: "/assets/img/industries/ovens.jpg",
        icon: "https://toptier.relats.com/wp-content/themes/relats/img/industries/ovens.svg",
        alt: "ovens",
        text: "Relats' sleeves are engineered for safety and durability in high temperature environments."
    },
    {
        name: "Vitroceramics",
        image: "/assets/img/industries/vitroceramics.jpg",
        icon: "https://toptier.relats.com/wp-content/themes/relats/img/industries/vitroceramics.svg",
        alt: "vitroceramics",
        text: "Specialized solutions for vitroceramic applications, ensuring optimal thermal protection."
    },
    {
        name: "Industrial",
        image: "/assets/img/industries/industrial-installations.jpg",
        icon: "https://toptier.relats.com/wp-content/themes/relats/img/industries/industrial-installations.svg",
        alt: "industrial",
        text: "Industrial installations benefit from Relats' robust and reliable insulation products."
    },
    {
        name: "Heat",
        image: "/assets/img/industries/heat.jpg",
        icon: "https://toptier.relats.com/wp-content/themes/relats/img/industries/heat.svg",
        alt: "heat",
        text: "Advanced protection for robotics and automation, supporting flexible and safe operation."
    },
    {
        name: "Electricity",
        image: "/assets/img/industries/electricity.jpg",
        icon: "https://toptier.relats.com/wp-content/themes/relats/img/industries/electricity.svg",
        alt: "electricity",
        text: "Specialized solutions for vitroceramic applications, ensuring optimal thermal protection."
    },
    {
        name: "Electromagnetic",
        image: "/assets/img/industries/electromagnetic.jpg",
        icon: "https://toptier.relats.com/wp-content/themes/relats/img/industries/electromagnetic.svg",
        alt: "electromagnetic",
        text: "Industrial installations benefit from Relats' robust and reliable insulation products."
    },
    {
        name: "Robotics",
        image: "/assets/img/industries/robotics.jpg",
        icon: "https://toptier.relats.com/wp-content/themes/relats/img/industries/robotics.svg",
        alt: "robotics",
        text: "Advanced protection for robotics and automation, supporting flexible and safe operation."
    }
];
