import Link from 'next/link'
import React from 'react'

export default function Commitment() {
  return (
    <section id="commitment" className='w-full flex gap-[1.5vw] bg-[#1D1D1D] px-[3vw] py-[3.5vw] h-screen relative'>
        <div className='w-[58%] h-full overflow-hidden rounded-[1.5vw]'>
        <video className='w-full h-full object-cover' src="https://toptier.relats.com/wp-content/themes/relats/videos/combo/sustainability.mp4" muted autoPlay playsInline loop></video></div>
        <div className='w-[42%] bg-white p-[3.5vw] flex flex-col items-start justify-between h-full rounded-[1.5vw]'>
            <div className='w-fit h-fit px-[.5vw] bg-[#42EC8B] py-[.2vw] flex items-center justify-center rounded-full'>
                <p className=' text-black font-DMMono font-medium text-[.8vw] leading-[1.1]'>COMING SOON</p>
            </div>
            <div className='space-y-[3vw]'>
               <h2 className='text-[3.5vw] leading-[1.1] tracking-tighter font-medium font-robert text-blackshade'>Sustainability
               Commitment</h2>
               <p className='text-blackshade'>When you see our sustainable certificate, you can rest assured that the product in your hands meets the highest standard of sustainability.</p>
               <Link href="/" className='text-blackshade duration-300 transition-all hover:bg-orange-500 px-[2vw] py-[1vw] border border-blackshade/20 rounded-[1vw]'>Sustainability</Link>
            </div>
        </div>
    </section>
  )
} 
