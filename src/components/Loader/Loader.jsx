'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/**
 * Helper to get all video elements on the page.
 */
function getAllVideos() {
  return Array.from(document.querySelectorAll('video'));
}

/**
 * Returns a promise that resolves when the given video is loaded enough to play.
 */
function waitForVideoLoaded(video) {
  return new Promise((resolve) => {
    // If already loaded
    if (video.readyState >= 3) {
      resolve();
      return;
    }
    const onLoaded = () => {
      resolve();
      video.removeEventListener('canplaythrough', onLoaded);
      video.removeEventListener('loadeddata', onLoaded);
    };
    video.addEventListener('canplaythrough', onLoaded);
    video.addEventListener('loadeddata', onLoaded);
  });
}

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const progressRef = useRef({ current: 0 })
  const counterRef = useRef()
  const [done, setDone] = useState(false)
  const loaderRef = useRef(null)

  useEffect(() => {
    let isMounted = true
    let cancelled = false

    async function handleAllVideosLoaded() {
      const videos = getAllVideos();
      const total = videos.length;
      if (total === 0) {
        // No videos, just finish
        gsap.to(progressRef.current, {
          current: 100,
          duration: 1,
          ease: 'power1.out',
          onUpdate: () => {
            if (isMounted) setProgress(Math.round(progressRef.current.current))
          },
          onComplete: () => setDone(true)
        });
        return;
      }

      let loadedCount = 0;

      // Progressively update as each video loads
      await Promise.all(
        videos.map((video) =>
          waitForVideoLoaded(video).then(() => {
            loadedCount += 1;
            // Animate progress to the new value
            gsap.to(progressRef.current, {
              current: (loadedCount / total) * 100,
              duration: 0.5,
              ease: 'power1.out',
              onUpdate: () => {
                if (isMounted) setProgress(Math.round(progressRef.current.current))
              }
            });
          })
        )
      );

      // Ensure progress is 100% at the end
      gsap.to(progressRef.current, {
        current: 100,
        duration: 0.5,
        ease: 'power1.out',
        onUpdate: () => {
          if (isMounted) setProgress(Math.round(progressRef.current.current))
        },
        onComplete: () => setDone(true)
      });
    }

    // Wait for DOMContentLoaded before querying videos
    if (document.readyState === 'loading') {
      const onReady = () => {
        document.removeEventListener('DOMContentLoaded', onReady);
        if (!cancelled) handleAllVideosLoaded();
      };
      document.addEventListener('DOMContentLoaded', onReady);
      return () => {
        isMounted = false;
        cancelled = true;
        document.removeEventListener('DOMContentLoaded', onReady);
      }
    } else {
      handleAllVideosLoaded();
      return () => {
        isMounted = false;
        cancelled = true;
      }
    }
  }, [])

  useEffect(() => {
    if (done && loaderRef.current) {
      gsap.to(loaderRef.current, {
        y: '-100%',
        duration: 1.5,
        ease: 'power4.inOut',
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.display = 'none';
          }
        }
      })
    }
  }, [done])

  return (
    <div
      ref={loaderRef}
      className={`h-screen w-full fixed top-0 left-0 z-[9999] bg-[#EAE4DF] flex items-center justify-center pointer-events-none`}
      style={{
        pointerEvents: done ? 'none' : 'auto',
        transition: 'none'
      }}
    >
      <p
        ref={counterRef}
        className="text-[10vw] leading-[1.1] font-medium text-blackshade/10 font-robert"
      >
        {progress}%
      </p>
    </div>
  )
}
