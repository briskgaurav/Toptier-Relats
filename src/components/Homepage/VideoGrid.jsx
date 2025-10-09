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
    const { isMobile } = UseMobile()

    useEffect(() => {
        const gridWrapper = document.querySelector('.grid-wrapper')
        const gapContainers = document.querySelectorAll('.gap-containers')
        const roundedDivs = document.querySelectorAll('.rounded-div')

        // Add will-change for smoother animations
        if (gridWrapper) {
            gridWrapper.style.willChange = 'transform, scale'
        }
        gapContainers.forEach(el => {
            el.style.willChange = 'gap'
        })
        roundedDivs.forEach(el => {
            el.style.willChange = 'border-radius'
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#video-grid",
                start: isMobile ? '20% 0%' : 'top top',
                end: 'bottom bottom',
                markers: false,
                scrub: true
            }
        })
        tl.to('.grid-wrapper', {
            scale: 1.2,
            duration:2,
            ease: "none",
        })
        tl.to('.gap-containers', {
            gap: '10px',
            ease: "none",
        }, "<")
        tl.to('.rounded-div', {
            borderRadius: '2%',
            ease: "none",
        }, "<")
        tl.to('.grid-wrapper', {
            yPercent: -20,
            ease: "power4.in",
            duration:2,
            
        },"<")
    


        // Cleanup will-change after animation
        return () => {
            if (gridWrapper) {
                gridWrapper.style.willChange = ''
            }
            gapContainers.forEach(el => {
                el.style.willChange = ''
            })
            roundedDivs.forEach(el => {
                el.style.willChange = ''
            })
        }
    }, [])

    useEffect(() => {
        let splittedText, splittedText2, textTl;

        // Use gsap.context for cleanup and scoping
        const ctx = gsap.context(() => {
            splittedText = splitTextByChars(".video-grid-text");
            splittedText2 = splitTextByChars(".video-grid-text2");

            gsap.set(splittedText.chars, { opacity: 0 });
            gsap.set(splittedText2.chars, { opacity: 0 });

            // Add will-change for text opacity
            splittedText.chars.forEach(char => {
                if (char && char.style) char.style.willChange = 'opacity'
            })
            splittedText2.chars.forEach(char => {
                if (char && char.style) char.style.willChange = 'opacity'
            })

            textTl = gsap.timeline({
                scrollTrigger: {
                    trigger: videoGridRef.current,
                    start: isMobile ? '20% 0%' : 'top top',
                    end: "100% ",
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

        // Cleanup will-change for text
        return () => {
            if (splittedText && splittedText.chars) {
                splittedText.chars.forEach(char => {
                    if (char && char.style) char.style.willChange = ''
                })
            }
            if (splittedText2 && splittedText2.chars) {
                splittedText2.chars.forEach(char => {
                    if (char && char.style) char.style.willChange = ''
                })
            }
            ctx.revert();
        }
    }, []);

    return (
        <section id='video-grid' className='w-full bg-blackshade h-[400vh]  scale-100 relative'>
            <div className='sticky top-0 h-screen w-full overflow-hidden' ref={videoGridRef}>
                <div className='grid grid-wrapper grid-rows-3  translate-y-[-18%] scale-210 gap-containers gap-[1px]' style={{ willChange: 'transform, scale' }}>
                    {/* First row: 2 columns, blue and red */}
                    <div className='h-[50vh] gap-containers gap-[1px] w-screen grid grid-cols-2' style={{ willChange: 'gap' }}>
                        <div className='w-full h-full rounded-div  overflow-hidden' style={{ willChange: 'border-radius' }}>
                            <video
                                src="https://toptier.relats.com/wp-content/themes/relats/videos/intro/top-left.mp4"
                                poster='https://toptier.relats.com/wp-content/themes/relats/videos/intro/top-left.jpg'
                                className='w-full h-full object-cover'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>
                        <div className='w-full h-full rounded-div overflow-hidden' style={{ willChange: 'border-radius' }}>
                            <video
                                src="https://toptier.relats.com/wp-content/themes/relats/videos/intro/top-right.mp4"
                                poster='https://toptier.relats.com/wp-content/themes/relats/videos/intro/top-right.jpg'
                                className='w-full h-full object-cover'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>
                    </div>
                    {/* Second row: 3 columns, blue, video, blue */}
                    <div className='h-[50vh] gap-containers gap-[1px] w-screen grid grid-cols-4' style={{ willChange: 'gap' }}>
                        <div className='col-span-1 h-full rounded-div  overflow-hidden' style={{ willChange: 'border-radius' }}>
                            <video
                                src="https://toptier.relats.com/wp-content/themes/relats/videos/intro/center-left.mp4"
                                poster='https://toptier.relats.com/wp-content/themes/relats/videos/intro/center-left.jpg'
                                className='w-full h-full object-cover'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>
                        <div className='col-span-2 h-full rounded-div overflow-hidden' style={{ willChange: 'border-radius' }}>
                            <video
                                src="https://toptier.relats.com/wp-content/themes/relats/videos/intro/center.mp4"
                                className='w-full h-full object-cover'
                                poster='https://toptier.relats.com/wp-content/themes/relats/videos/intro/center.jpg'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>
                        <div className='col-span-1 h-full rounded-div  overflow-hidden' style={{ willChange: 'border-radius' }}>
                            <video
                                src="https://toptier.relats.com/wp-content/themes/relats/videos/intro/center-right.mp4"
                                poster='https://toptier.relats.com/wp-content/themes/relats/videos/intro/center-right.jpg'
                                className='w-full h-full object-cover'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>
                    </div>
                    {/* Third row: 2 columns, blue and red */}
                    <div className='h-[50vh] gap-containers gap-[1px] w-screen grid grid-cols-2' style={{ willChange: 'gap' }}>
                        <div className='w-full h-full rounded-div  overflow-hidden' style={{ willChange: 'border-radius' }}>
                            <video
                                src="https://toptier.relats.com/wp-content/themes/relats/videos/intro/bottom-left.mp4"
                                poster='https://toptier.relats.com/wp-content/themes/relats/videos/intro/bottom-left.jpg'
                                className='w-full h-full object-cover'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>
                        <div className='w-full h-full rounded-div  overflow-hidden' style={{ willChange: 'border-radius' }}>
                            <video
                                src="https://toptier.relats.com/wp-content/themes/relats/videos/intro/bottom-right.mp4"
                                poster='https://toptier.relats.com/wp-content/themes/relats/videos/intro/bottom-right.jpg'
                                className='w-full h-full object-cover'
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>
                    </div>
                </div>
                <p className='text-white text-[3vw] max-md:text-[5vw]  max-sm:text-[7vw] video-grid-text leading-[1.1] font-medium font-robert text-center w-[40%] absolute max-md:w-[65%] max-sm:w-[92%] top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2' style={{ willChange: 'opacity' }}>Your 360° partner for safety in electromobility</p>
                <p className='text-white text-[3vw] max-sm:text-[7vw]  max-md:text-[5vw] video-grid-text2 leading-[1.1] font-medium font-robert text-center w-[36%] max-sm:w-[70%] max-md:w-[60%] absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2' style={{ willChange: 'opacity' }}>We cover all sustainable
                    mobility solutions</p>
                <div className='h-[.7vw] absolute bottom-0 bg-blackshade w-full'>

                </div>
            </div>

        </section>
    )
}