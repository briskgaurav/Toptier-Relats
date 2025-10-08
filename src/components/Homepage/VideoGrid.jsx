'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { splitTextByChars } from '@/Animation/GsapAnimation'
import MorePerflix from '../Floating/MorePerflix'
import UseMobile from '../UseMobile'
gsap.registerPlugin(ScrollTrigger)

export default function VideoGrid() {
    const videoGridRef = useRef(null)
    const {isMobile} = UseMobile()

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: videoGridRef.current,
                start: isMobile ? '20% 0%' : 'top top',
                end: '+300% top',
                pin: true,
                markers: false,
                scrub: true
            }
        })
        tl.to('.grid-wrapper', {
            scale: 1.5,
        })
        tl.to('.gap-containers', {
            gap: '10px',
        }, "<")
        tl.to('.rounded-div', {
           borderRadius: '2%',
        }, "<")
    }, [])

    useEffect(() => {
        let splittedText, splittedText2, textTl;

        // Use gsap.context for cleanup and scoping
        const ctx = gsap.context(() => {
            splittedText = splitTextByChars(".video-grid-text");
            splittedText2 = splitTextByChars(".video-grid-text2");

            gsap.set(splittedText.chars, { opacity: 0 });
            gsap.set(splittedText2.chars, { opacity: 0 });

            textTl = gsap.timeline({
                scrollTrigger: {
                    trigger: videoGridRef.current,
                    start:  isMobile ? '20% 0%' : 'top top',
                    end: "+=300%",
                    scrub: true,
                    markers: false,
                },
            });

            // Animate in first text
            textTl.to(
                splittedText.chars,
                {
                    opacity: 1,
                    stagger: 0.06,
                    ease: "none",
                    duration: 0.5,
                },
                0
            );

            // Animate out first text
            textTl.to(
                splittedText.chars,
                {
                    opacity: 0,
                    stagger: 0.06,
                    ease: "none",
                    duration: 0.5,
                },
                "+=0.5"
            );

            // Animate in second text
            textTl.to(
                splittedText2.chars,
                {
                    opacity: 1,
                    stagger: 0.06,
                    ease: "none",
                    duration: 0.5,
                },
                "+=0.2"
            );

            // Animate out second text
            textTl.to(
                splittedText2.chars,
                {
                    opacity: 0,
                    stagger: 0.06,
                    ease: "none",
                    duration: 0.5,
                },
                "+=0.5"
            );
        }, videoGridRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id='video-grid' ref={videoGridRef} className='w-full bg-blackshade h-[130vh] overflow-x-hidden scale-100 overflow-hidden relative'>
           
            <div className='grid grid-wrapper grid-rows-3  translate-y-[-18%] scale-210 gap-containers gap-[1px]'>
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
            <p className='text-white text-[3vw] max-md:text-[5vw]  max-sm:text-[7vw] video-grid-text leading-[1.1] font-medium font-robert text-center w-[40%] absolute max-md:w-[65%] max-sm:w-[92%] top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2'>Your 360° partner for safety in electromobility</p>
            <p className='text-white text-[3vw] max-sm:text-[7vw]  max-md:text-[5vw] video-grid-text2 leading-[1.1] font-medium font-robert text-center w-[50%] max-sm:w-[70%] max-md:w-[60%] absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2'>We cover all sustainable
            mobility <br className="max-md:hidden" /> solutions</p>
        </section>
    )
}
