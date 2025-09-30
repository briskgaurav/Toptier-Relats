'use client'
import React, { useEffect, useRef } from 'react'
import useVideoScroll from '@/Animation/UseVideoScroll'

export default function Periflex() {

    const videoRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;
        if (!video || !container) return;
    
        const cleanup = useVideoScroll({ video, container, triggerValues: {
            start: "0% 80%",
            end: "90% 100%",
        } });
    
        return cleanup;
      }, []);
  return (
    <section id='periflex' ref={containerRef} className='w-full relative h-[800vh]'>
        <div className='w-full h-screen sticky top-0'>

        <video ref={videoRef} src={'https://toptier.relats.com/wp-content/themes/relats/videos/periflex/periflex.mp4'} className='w-full h-full object-cover' muted loop />
        </div>
    </section>
  )
}
