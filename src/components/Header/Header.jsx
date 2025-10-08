'use client'
import { LogoSVG } from '@/Utils/SVGs'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import MorePerflix from '../Floating/MorePerflix'

export default function Header() {
  const [isHovered, setIsHovered] = useState(false)
  const spanRef = useRef(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
    gsap.to(spanRef.current, {
      x: '100%',
      duration: 0.3,
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    gsap.to(spanRef.current, {
      x: '-5%',
      duration: 0.3,
    })
  }

  return (
    <>
      <nav className='px-[.5vw] overflow-x-hidden fixed z-[50] max-md:w-[90vw] max-md:px-[5vw] navbarRef rounded-[1.3vw] h-[7vh] py-[.3vw] left-1/2 bg-white/20 backdrop-blur-[10px] translate-x-[-50%] max-md:translate-x-[-44%] max-sm:translate-x-[-44%] max-md:left-[45%] flex items-center gap-[3vw] max-md:gap-[4vw] top-[1vw] max-md:top-[3vw] max-md:h-[12vw] max max-md:rounded-[4vw]'>
        <div className='w-[8vw] max-md:w-[25vw] pl-[1vw] py-[1vw] h-fit max-md:pl-0 max-md:py-0 flex items-center'>
          <LogoSVG />
        </div>
        <div
          className='space-x-[3vw] w-[20vw] max-md:w-[80vw] h-full flex items-center relative max-md:space-x-[0vw] max-md:justify-between'
        >
          <span
            ref={spanRef}
            className='w-1/2 h-full absolute bg-blackshade rounded-[1vw] left-0 top-0 max-md:rounded-[5vw]'
            style={{ transform: 'translateX(-5%)' }}
          ></span>
          <div className='w-1/2 flex h-full relative mix-blend-difference text-white z-[2] text-[1.05vw] max-md:text-[3vw] max-md:w-[48%] items-center justify-center'>
            <Link href='/'>Full view</Link>
          </div>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='w-1/2 flex relative h-full mix-blend-difference text-white text-[1.05vw] pr-[1vw] z-[2] items-center justify-center max-md:text-[3vw] max-md:w-[48%] max-md:pr-0'
          >
            <Link href='/'>Overview</Link>
          </div>
        </div>
      </nav>
      <MorePerflix />
    </>
  )
}
