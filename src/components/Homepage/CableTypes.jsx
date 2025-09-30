'use client'
import Image from "next/image";
import React, { useState } from "react";
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
      positionClassName: "left-[40%] top-[35%] -translate-x-1/2 -translate-y-1/2 absolute",
    },
  },
  {
    key: "card-1",
    cardProps: {
      contentClassName: "text-[1.3vw] w-full",
      content: "FMVSS 302 Self-extinguishing UL94 V1 (Ø 18 mm)",
      positionClassName: "left-[75%] top-[45%] -translate-x-1/2 -translate-y-1/2 absolute",
    },
  },
  {
    key: "card-2",
    cardProps: {
      contentClassName: "text-[1.3vw] w-full",
      heading: "Thermal Runway",
      content: "+1000ºC x 5 mins ≥ 5kV (TE) +1000ºC x 15 mins ≥ 2kV (DFT) +850ºC x 30 mins ≥ 2kV (DFT)",
      positionClassName: "left-[55%] top-[80%] -translate-x-1/2 -translate-y-1/2 absolute",
    },
  },
];

const imageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: "linear" } },
  exit: { opacity: 0, transition: { duration: 0.35, ease: "linear" } },
};

const cardVariants = {
  initial: { opacity: 0 },
  animate: (i) => ({
    opacity: 1,
    transition: {
      opacity: { delay: 0.1 + i * 0.07, duration: 0.5, ease: "linear" },
    },
  }),
  exit: (i) => ({
    opacity: 0,
    transition: {
      opacity: { delay: i * 0.07, duration: 0.35, ease: "linear" },
    },
  }),
};

export default function CableTypes({ type, setType }) {
 

  const handleTypeChange = (newType) => {
    if (newType === type) return;
    setType(newType);
  };

  return (
    <section
      id="cable-types"
      className="w-full cable-types absolute inset-0 z-[5] h-screen"
    >
      {/* Smooth image transition */}
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
              onClick={() => handleTypeChange("revitex-wsx45")}
            >
              Revitex WSX45
            </p>
            <p
              onClick={() => handleTypeChange("revitex-vsc25")}
              className={`text-[3.5vw] cursor-pointer leading-[1.2] tracking-tighter font-medium font-robert ${type !== "revitex-vsc25" ? "opacity-50" : ""}`}
            >
              Revitex VSC25
            </p>
            <p
              onClick={() => handleTypeChange("revitex-vsctf")}
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
          {/* Card wrappers with framer-motion fadeup animation */}
          <AnimatePresence mode="wait">
            {cardData.map((card, i) => (
              <motion.div
                className="card-wrapper"
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
