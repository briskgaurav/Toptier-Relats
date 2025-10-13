'use client'
import Image from "next/image";
import React from "react";
import Cards from "./Cards";
import { motion, AnimatePresence } from "framer-motion";

const cableImages = {
  "revitex-wsx45": "/assets/img/revitex/1.jpg",
  "revitex-vsc25": "/assets/img/revitex/2.jpg",
  "revitex-vsctf": "/assets/img/revitex/3.jpg",
};

const cardData = [
  {
    key: "card-0",
    cardProps: {
        contentClassName: "max-sm:text-[7vw] mt-[7vw] text-[3vw] w-full",
    },
    positionClassName: "left-[-10%] w-[80%] max-sm:top-[10%] max-md:top-[15%] max-md:-translate-x-[25%] max-sm:-translate-x-0 -translate-y-1/2 absolute",
  },
  {
    key: "card-1",
    cardProps: {
      contentClassName: "max-sm:text-[3.6vw] mt-[7vw] w-full",
      content: "FMVSS 302 Self-extinguishing UL94 V1 (Ø 18 mm)",
    },
    positionClassName: "max-sm:left-[75%] max-md:left-[90%] w-[80%] top-[45%] -translate-x-1/2 -translate-y-1/2 absolute",
  },
  {
    key: "card-2",
    cardProps: {
      contentClassName: "max-sm:text-[3.6vw] mt-[7vw] w-full",
      heading: "Thermal Runway",
      content: "+850ºC x 30 mins ≥ 2kV (DFT) (Thermal Exposure)",
    },
    positionClassName: "max-sm:left-[30%]  max-md:left-[10%] w-[80%] top-[60%] -translate-x-1/2 -translate-y-1/2 absolute",
  },
];

const imageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: "linear" } },
  exit: { opacity: 0, transition: { duration: 0.35, ease: "linear" } },
};

// Animate cards from a little y offset
const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      opacity: { delay: 0.15 + i * 0.12, duration: 0.5, ease: "linear" },
      y: { delay: 0.15 + i * 0.12, duration: 0.5, ease: "easeOut" },
    },
  }),
  exit: (i) => ({
    opacity: 0,
    y: 30,
    transition: {
      opacity: { delay: i * 0.12, duration: 0.35, ease: "linear" },
      y: { delay: i * 0.12, duration: 0.35, ease: "easeIn" },
    },
  }),
};

export default function CableTypesMobile({ type, setType, handleScrollToCable }) {

  const handleTypeClick = (newType) => {
    if (newType === type) return;
    setType(newType);
    handleScrollToCable && handleScrollToCable(newType);
  };

  return (
    <section
      id="cable-typesMobile"
      className="w-full hidden max-md:block relative inset-0 z-[5] h-screen overflow-x-hidden"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={type}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={cableImages[type]}
              alt="Cable Types"
              height={1000}
              width={1000}
              className="object-cover cable-img h-full w-full"
              priority
              style={{ opacity: 1 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute h-full w-full flex flex-col items-center justify-between inset-0 z-[5]">
        <div className="w-full flex flex-col items-start  px-[3vw] pb-[8vw] justify-center gap-[1.8vw] text-white h-full">
       
          <div className="w-full text-center h-fit">
            <p
              className={`text-[3.5vw] max-sm:text-[11.5vw] max-md:text-[5.5vw] cursor-pointer leading-[1.2] tracking-tighter text-white font-medium font-robert ${type !== "revitex-wsx45" ? "opacity-50" : ""}`}
              onClick={() => handleTypeClick("revitex-wsx45")}
            >
              Revitex WSX45
            </p>
            <p
              onClick={() => handleTypeClick("revitex-vsc25")}
              className={`text-[3.5vw] max-sm:text-[11.5vw] max-md:text-[5.5vw] cursor-pointer leading-[1.2] tracking-tighter font-medium font-robert ${type !== "revitex-vsc25" ? "opacity-50" : ""}`}
            >
              Revitex VSC25
            </p>
            <p
              onClick={() => handleTypeClick("revitex-vsctf")}
              className={`text-[3.5vw] max-sm:text-[11.5vw] max-md:text-[5.5vw] text-center w-full cursor-pointer leading-[1.2] tracking-tighter font-medium font-robert ${type !== "revitex-vsctf" ? "opacity-50" : ""}`}
            >
              Revitex VSCTF
            </p>
          </div>
          <div className="flex items-center  w-full justify-center max-md:gap-[2vw] gap-[1vw]">
            <p className="text-[.8vw] max-sm:text-[2.5vw] max-md:text-[1.5vw] mt-[1vw] text-center leading-[1.1] font-medium font-DMMono uppercase">
              Available in{" "}
            </p>
            <span className="max-md:w-[2vw] max-md:h-[2vw] w-[.8vw] h-[.8vw] bg-orange rounded-full"></span>
          </div>
        </div>
        <div className="w-full relative h-full">
          <AnimatePresence mode="wait">
            {cardData.map((card, i) => (
              <motion.div
                className={`card-wrapper bg-black/5 !backdrop-blur-[10px] ${card.positionClassName || ""}`}
                key={card.key + type}
                custom={i}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Cards {...card.cardProps} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
