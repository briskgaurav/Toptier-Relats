'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function VideoGrid() {
    const videoGridRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: videoGridRef.current,
                start: 'top top',
                end: '+300% top',
                pin: true,
                markers: false,
                scrub: true
            }
        })
        tl.to('.grid-wrapper', {
            scale: 1.1,
        })
        tl.to('.gap-containers', {
            gap: '10px',
        }, "<")
        tl.to('.rounded-div', {
           borderRadius: '2%',
        }, "<")

    }, [])

    
    return (
        <section id='video-grid' ref={videoGridRef} className='w-full bg-blackshade h-[130vh] scale-100 overflow-hidden relative'>
            <div className='grid grid-wrapper grid-rows-3 translate-y-[-18%] scale-210 gap-containers gap-[1px]'>
                {/* First row: 2 columns, blue and red */}
                <div className='h-[50vh] gap-containers gap-[1px] w-screen grid grid-cols-2'>
                    <div className='w-full h-full rounded-div bg-blue-500 overflow-hidden'>
                        <video 
                            src="https://toptier.relats.com/wp-content/themes/relats/videos/intro/top-left.mp4" 
                            className='w-full h-full object-cover' 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                        />
                    </div>
                    <div className='w-full h-full rounded-div bg-red-500 overflow-hidden'>
                        <video 
                            src="https://toptier.relats.com/wp-content/themes/relats/videos/intro/top-right.mp4" 
                            className='w-full h-full object-cover' 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                        />
                    </div>
                </div>
                {/* Second row: 3 columns, blue, video, blue */}
                <div className='h-[50vh] gap-containers gap-[1px] w-screen grid grid-cols-4'>
                    <div className='col-span-1 h-full rounded-div bg-blue-500 overflow-hidden'>
                        <video 
                            src="https://toptier.relats.com/wp-content/themes/relats/videos/intro/center-left.mp4" 
                            className='w-full h-full object-cover' 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                        />
                    </div>
                    <div className='col-span-2 h-full rounded-div overflow-hidden'>
                        <video 
                            src="https://toptier.relats.com/wp-content/themes/relats/videos/intro/center.mp4" 
                            className='w-full h-full object-cover' 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                        />
                    </div>
                    <div className='col-span-1 h-full rounded-div bg-blue-500 overflow-hidden'>
                        <video 
                            src="https://toptier.relats.com/wp-content/themes/relats/videos/intro/center-right.mp4" 
                            className='w-full h-full object-cover' 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                        />
                    </div>
                </div>
                {/* Third row: 2 columns, blue and red */}
                <div className='h-[50vh] gap-containers gap-[1px] w-screen grid grid-cols-2'>
                    <div className='w-full h-full rounded-div bg-blue-500 overflow-hidden'>
                        <video 
                            src="https://toptier.relats.com/wp-content/themes/relats/videos/intro/bottom-left.mp4" 
                            className='w-full h-full object-cover' 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                        />
                    </div>
                    <div className='w-full h-full rounded-div bg-red-500 overflow-hidden'>
                        <video 
                            src="https://toptier.relats.com/wp-content/themes/relats/videos/intro/bottom-right.mp4" 
                            className='w-full h-full object-cover' 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                        />
                    </div>
                </div>
            </div>
            <p className='text-white text-[3vw] leading-[1.1] font-medium font-robert text-center w-[40%] absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2'>We cover all sustainable mobility solutions</p>
        </section>
    )
}
