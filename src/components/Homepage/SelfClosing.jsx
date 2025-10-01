'use client'
import React, { useRef, useEffect } from 'react'
import useVideoScroll from '@/Animation/UseVideoScroll'

export default function SelfClosing() {
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const cleanup = useVideoScroll({
      video,
      container,
      triggerValues: { start: "top top", end: "100% top" },
    })

    return cleanup
  }, [])

  return (
    <section
      id="self-closing"
      className="w-full h-[500vh]"
      ref={containerRef}
    >
      <div className="h-screen w-full overflow-hidden sticky top-0">
        <video
          ref={videoRef}
          src="/assets/videos/combo/self-closing.mp4"
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
        ></video>
      </div>
    </section>
  )
}
