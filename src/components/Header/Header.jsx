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
    <nav className='px-[.5vw] fixed z-[50] navbarRef rounded-[1.3vw] h-[7vh] py-[.3vw] left-1/2 bg-white/20 backdrop-blur-[10px]  translate-x-[-50%] flex items-center gap-[3vw] top-[1vw]'>
      <div className='w-[8vw] pl-[1vw] py-[1vw] h-fit'>
        <LogoSVG />
      </div>
      <div
        className='space-x-[3vw] w-[20vw] h-full flex items-center relative'

      >
        <span
          ref={spanRef}
          className='w-1/2 h-full absolute bg-blackshade rounded-[1vw] left-0 top-0'
          style={{ transform: 'translateX(-5%)' }}
        ></span>
        <div className='w-1/2 flex h-full relative mix-blend-difference text-white z-[2] text-[1.05vw] items-center justify-center'>
          <Link href='/'>Full view</Link>
        </div>
        <div onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave} className='w-1/2 flex relative h-full mix-blend-difference text-white text-[1.05vw] pr-[1vw]  z-[2] items-center justify-center'>
          <Link href='/'>Overview</Link>
        </div>
      </div>
    </nav>
    <MorePerflix />
    </>
  )
}
