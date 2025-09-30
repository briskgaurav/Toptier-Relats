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
    <section className="w-full h-[110vh] px-[3vw] py-[5vw] flex bg-[#1D1D1D]">
      <div className="w-1/2 flex flex-col items-start justify-between space-y-[2vw] h-full ">
        <div>
          <h2 className="heading2 w-[50%]">Innovating worldwide</h2>
          <p className="content2 w-[70%] opacity-60">
            Relats is ahead of the curve in achieving sustainable change across
            the globe.
          </p>
        </div>
        <div className="w-full flex gap-[1vw]">
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
      <div className="w-[50%]  h-full flex items-center justify-center">
        <Image
          src="/assets/img/worldwide/world.svg"
          alt="WorldWide"
          width={1000}
          height={1000}
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
}
