"use client";
import React, { useRef, useEffect, useState } from "react";
import useVideoScroll from "@/Animation/UseVideoScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { splitTextByChars } from "@/Animation/GsapAnimation";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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

export default function SelfClosingMobile() {
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    return (
        <>
            <section
                id="self-closing"
                className="w-full h-screen max-md:block hidden overflow-x-hidden"
                ref={containerRef}
            >
                <div className="h-screen w-full overflow-hidden sticky top-0">
                    <video
                        ref={videoRef}
                        src="/assets/videos/combo/self-closing.mp4"
                        className="w-full h-full object-cover"
                        muted
                        autoPlay
                        playsInline
                    ></video>
                    <h2 className="heading2 w-[60%] max-sm:text-[13vw] max-sm:scale-140 max-md:scale-80  scale-65 text-center absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-white ">
                        We make mobility safer <br /> across all industries
                    </h2>
                </div>
            </section>
            <div className="w-full bg-[#1d1d1d] space-y-[5vw] py-[15vw] max-sm:h-[90vh] h-[120vh] max-md:block hidden">
                <p className="font-DMMono text-[2.6vw] opacity-50 uppercase leading-[1.25] font-medium tracking-tighter text-center">
                    Mobility Industries
                </p>
                {/* Swiper for mobile industries cards */}
                <div className="w-full h-[95%]">
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1.1}
                        className="h-full w-full"
                        centeredSlides={true}
                        pagination={{ clickable: false }}
                    >
                        {INDUSTRIES.map((industry, idx) => (
                            <SwiperSlide key={industry.key}>
                                <div className="flex flex-col items-center justify-center w-full h-full relative max-sm:rounded-xl max-md:rounded-[3vw] overflow-hidden ">
                                    <div className="w-full flex h-full justify-center">
                                        <video
                                            src={industry.video}
                                            className="h-full w-full object-cover blur-[20px]"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                        />
                                    </div>
                                    <div className="absolute  inset-0 z-[2] h-full w-full">

                                        <img
                                            src={industry.image}
                                            alt={industry.data.name}
                                            className="w-full h-full object-cover"
                                        />

                                    </div>
                                    <div className="absolute top-[5vw] flex px-[5vw] left-0 inset-0 z-[5] h-fit items-center gap-[2vw] w-full">
                                        <div className="w-[15vw] overflow-hidden border-2 border-white/40 rounded-xl h-[15vw] ">
                                            <video
                                                src={industry.video}
                                                className="w-full h-full object-cover"
                                                autoPlay
                                                loop
                                                muted
                                            />

                                        </div>
                                        <p className="text-[5vw]  text-white uppercase leading-[1.1]">Construction machines</p>

                                    </div>
                                    <div className="absolute z-[5] bottom-[5vw] left-1/2 -translate-x-1/2 rounded-xl px-6 py-3 w-[90%]  bg-white/20 backdrop-blur-[10px] border border-white/20 space-y-[2vw] text-white">
                                        <h3 className="text-[10vw] leading-[1.1] w-full uppercase font-medium ">
                                            {industry.data.name}
                                        </h3>
                                        <div className="flex items-center gap-2 ">
                                            <img
                                                src={industry.data.icon}
                                                alt=""
                                                className="w-4 h-4"
                                            />
                                            <span className="text-[2vw] uppercase">
                                                Operating temperature
                                            </span>
                                        </div>
                                        <div className="w-full space-y-[1vw]">
                                            <p className="font-DMMono text-[3vw] uppercase">Abrasion resistance</p>
                                            <div className="bg-white rounded-full px-3 py-1 text-blackshade">

                                                <p className="text-[2.2vw] font-DMMono uppercase w-full">{industry.data.abrasion} ({industry.data.abrasionStandard})</p>
                                            </div>
                                        </div>
                                        <div className="w-full flex items-center gap-2 space-y-[1vw]">
                                            <p className="font-DMMono text-[3vw] uppercase">Available in</p>
                                            <div className="flex items-center gap-2">
                                                {industry.data.availableColors.map((color, idx) => (
                                                    <span key={color + idx} className={`w-[2vw] h-[2vw] bg-${color} rounded-full`}></span>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}
