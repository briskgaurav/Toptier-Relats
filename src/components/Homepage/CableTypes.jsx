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
    },
    positionClassName: "left-[40%] w-full top-[35%] -translate-x-1/2 -translate-y-1/2 absolute",
  },
  {
    key: "card-1",
    cardProps: {
      heading:'Flammability',
      imageSrc:'/assets/img/revitex/icons/flammability.svg',
      contentClassName: "text-[1.3vw] w-[100%] mt-[1vw]",
      content: "FMVSS 302 Self-extinguishing UL94 V1 (Ø 18 mm)",
    },
    positionClassName: "left-[75%] w-full top-[45%] -translate-x-1/2 -translate-y-1/2 absolute",
  },
  {
    key: "card-2",
    cardProps: {
      heading:'Thermal runway',
      imageSrc:'/assets/img/revitex/icons/thermal.svg',
      contentClassName: "text-[1.3vw] mt-[1vw] w-full",
      heading: "Thermal Runway",
      content: "+500ºC x 5 mins ≥ 2kV (Thermal Exposure)",
    },
    positionClassName: "left-[55%] w-full top-[80%] -translate-x-1/2 -translate-y-1/2 absolute",
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

export default function CableTypes({ type, setType, handleScrollToCable }) {

  const handleTypeClick = (newType) => {
    if (newType === type) return;
    setType(newType);
    handleScrollToCable && handleScrollToCable(newType);
  };

  return (
    <section
      id="cable-types"
      className="w-full cable-types max-md:hidden absolute inset-0 z-[5] h-screen"
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

      <div className="absolute h-full w-full flex inset-0 z-[5]">
        <div className="w-full flex flex-col items-start px-[3vw] pb-[8vw] justify-end gap-[1.8vw] text-white h-full">
          <p className="text-[.8vw] leading-[1.1] font-medium font-DMMono uppercase">
            E-mobility solutions
          </p>
          <div>
            <p
              className={`text-[3.5vw] cursor-pointer leading-[1.2] tracking-tighter text-white font-medium font-robert ${type !== "revitex-wsx45" ? "opacity-50" : ""}`}
              onClick={() => handleTypeClick("revitex-wsx45")}
            >
              Revitex WSX45
            </p>
            <p
              onClick={() => handleTypeClick("revitex-vsc25")}
              className={`text-[3.5vw] cursor-pointer leading-[1.2] tracking-tighter font-medium font-robert ${type !== "revitex-vsc25" ? "opacity-50" : ""}`}
            >
              Revitex VSC25
            </p>
            <p
              onClick={() => handleTypeClick("revitex-vsctf")}
              className={`text-[3.5vw] cursor-pointer leading-[1.2] tracking-tighter font-medium font-robert ${type !== "revitex-vsctf" ? "opacity-50" : ""}`}
            >
              Revitex VSCTF
            </p>
          </div>
          <div className="flex items-center gap-[1vw]">
            <p className="text-[.8vw] leading-[1.1] font-medium font-DMMono uppercase">
              Available in{" "}
            </p>
            <span className="w-[.8vw] h-[.8vw] bg-orange rounded-full"></span>
          </div>
        </div>
        <div className="w-full relative h-full">
          <AnimatePresence mode="wait">
            {cardData.map((card, i) => (
              <motion.div
                className={`card-wrapper bg-black/5 backdrop-blur-[10px] h-[15vw] rounded-[1.5vw] !w-[15vw] ${card.positionClassName || ""}`}
                key={card.key + type}
                custom={i}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Cards backdropEnabled={false} {...card.cardProps} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
