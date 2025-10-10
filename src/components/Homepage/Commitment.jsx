import Link from 'next/link'
import React from 'react'

export default function Commitment() {
  return (
    <section
      id="commitment"
      className="
        w-full flex gap-[1.5vw] bg-[#1D1D1D] px-[3vw] py-[3.5vw] h-screen relative
        max-md:flex-col max-md:gap-[2vw] max-md:px-[2vw] max-md:justify-center  max-md:py-[8vw] max-md:h-screen
      "
    >
      <div
        className="
          w-[58%] fadeup h-full overflow-hidden rounded-[1.5vw]
          max-md:w-full max-md:h-full max-md:rounded-[4vw]
        "
      >
        <video
          className="w-full h-full object-cover"
          src="https://toptier.relats.com/wp-content/themes/relats/videos/combo/sustainability.mp4"
          muted
          autoPlay
          playsInline
          loop
        ></video>
      </div>
      <div
        className="
          w-[42%] fadeup bg-white max-md:justify-evenly p-[3.5vw] flex flex-col items-start justify-between h-full rounded-[1.5vw]
          max-md:w-full max-md:rounded-[4vw] max-md:p-[4vw] max-md:py-[10vw] max-md:h-full
        "
      >
        <div
          className="
            w-fit h-fit px-[.5vw] bg-[#42EC8B] py-[.2vw] max-sm:translate-y-[-150%] flex items-center justify-center rounded-full
            max-md:px-[2vw]  max-md:py-[1vw] max-md:rounded-[2vw]
          "
        >
          <p className="text-black font-DMMono font-medium text-[.8vw] leading-[1.1] max-sm:text-[3vw] max-md:text-[1.5vw]">
            COMING SOON
          </p>
        </div>
        <div className="space-y-[3vw] max-sm:space-y-[5vw] max-md:space-y-[4vw] mt-[2vw] max-md:mt-[4vw]">
          <h2 className="text-[3.5vw] max-sm:text-[8vw] leading-[1.1]  tracking-tighter font-medium font-robert text-blackshade max-md:text-[5vw]">
            Sustainability
            <br className="" />
            Commitment
          </h2>
          <p className="text-blackshade max-sm:text-[3.8vw] max-sm:mb-[10vw] max-md:text-[3vw]">
            When you see our sustainable certificate, you can rest assured that the product in your hands meets the highest standard of sustainability.
          </p>
          <Link
            href="/"
            className="
              text-blackshade duration-300 transition-all hover:bg-orange-500 px-[2vw] py-[1vw] border border-blackshade/20 rounded-[1vw]
              max-sm:text-[3.8vw] max-md:text-[2.5vw] max-md:px-[6vw] max-md:py-[3vw] max-md:rounded-[3vw]
            "
          >
            Sustainability
          </Link>
        </div>
      </div>
    </section>
  )
} 
