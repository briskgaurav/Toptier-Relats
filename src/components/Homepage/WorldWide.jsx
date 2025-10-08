import Image from "next/image";
import React from "react";
const stats = [
    {
      label: "Presence in",
      value: "4",
      sublabel: "continents",
    },
    {
      label: "Clients in",
      value: "55",
      sublabel: "countries",
    },
    {
      label: "Manufacturing in",
      value: "5 production",
      sublabel: "plants",
    },
    {
      label: "Employing",
      value: "1200+",
      sublabel: "people",
    },
  ]

export default function WorldWide() {
  return (
    <section className="w-full relative h-[110vh] px-[3vw] py-[5vw] flex max-md:flex-col max-md:py-[10vw] bg-[#1D1D1D]">
      <div className="w-1/2 max-md:w-full flex flex-col max-md:items-center max-md:justify-start items-start justify-between space-y-[2vw] h-full ">
        <div className="max-md:w-full max-md:flex max-md:justify-center max-md:items-center max-md:flex-col max-md:space-y-[5vw]">
          <h2 className="heading2 max-sm:!text-[10vw] max-md:text-[5vw] max-md:text-center max-md:w-[60%] w-[50%`]">Innovating worldwide</h2>
          <p className="content2 max-sm:!text-[5vw] max-md:!text-[2.5vw] max-md:w-[100%] max-md:text-center w-[70%] opacity-60">
            Relats is ahead of the curve in achieving sustainable change across
            the globe.
          </p>
        </div>
        <div className="w-full max-md:hidden flex gap-[1vw]">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex min-w-[13vw] h-fit items-start gap-[5vw] flex-col bg-white/15 rounded-[1.5vw] p-[1.5vw] "
            >
              <p className="text-[1vw] opacity-80 leading-[1.1] ">{stat.label}</p>
              <div className="text-[1.5vw] leading-[1.1] font-medium font-robert">
                <p>{stat.value}</p>
                <p>{stat.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[50%] max-md:absolute max-md:inset-0 max-md:w-full h-full flex items-center max-md:scale-120 justify-center">
        <Image
          src="/assets/img/worldwide/world.svg"
          alt="WorldWide"
          width={1000}
          height={1000}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full flex-col max-md:flex-wrap max-md:flex-row max-md:justify-center max-md:items-center max-sm:gap-[4vw] gap-[1vw] hidden max-md:flex mt-[8vw]">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-between min-w-[30vw] h-fit gap-[2vw] bg-white/15 backdrop-blur-[10px] rounded-[4vw] max-sm:p-[6vw] max-md:p-[3vw] p-[6vw] max-md:h-[18vh] max-sm:h-[20vh] max-sm:w-[45%] max-md:w-[24%] max-md:min-w-[23%] max-sm:min-w-[30vw]"
          >
            <p className=" max-md:text-left opacity-80 max-sm:text-[3vw] max-md:text-[2vw] text-[3vw] leading-[1.1] w-full">{stat.label}</p>
            <div className="text-[6vw] w-full leading-[1.1] font-medium font-robert text-center max-md:text-left max-sm:text-[6vw] max-md:text-[2.5vw]">
              <p className="text-[5vw] max-sm:text-[5vw] max-md:text-[3.5vw]"> {stat.value} {stat.sublabel}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
