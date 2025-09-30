import Image from 'next/image'
import React from 'react'

export default function MorePerflix() {
  return (
    <div className="group fixed z-[50] bottom-[2.5vw] left-1/2 -translate-x-1/2">
    <div className="flex items-center  bg-white/20 group-hover:bg-white/30 transition-all duration-500 cursor-pointer backdrop-blur-[10px]  p-[.2vw] gap-[1vw] rounded-[1.2vw]">
      <div className="h-[3vw] w-[3vw] bg-white overflow-hidden rounded-[1.2vw]">
        <Image
          src={"/assets/img/floating/periflex-emi.jpg"}
          height={100}
          alt='Periflex EMI'
          width={100}
          className="h-full w-full scale-125 group-hover:scale-100 transition-all duration-500 object-contain"
        />
      </div>
      <p className="text-blackshade text-[1vw] pr-[2vw]">
        More about Periflex EMI
      </p>
    </div>
  </div>
  )
}
