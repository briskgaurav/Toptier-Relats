'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function getAllVideos() {
  return Array.from(document.querySelectorAll('video'));
}

function waitForVideoLoaded(video, timeout = 8000) {
  return new Promise((resolve) => {
    let resolved = false;
    
    // If already loaded
    if (video.readyState >= 3) {
      resolve();
      return;
    }
    
    const onLoaded = () => {
      if (!resolved) {
        resolved = true;
        resolve();
        video.removeEventListener('canplaythrough', onLoaded);
        video.removeEventListener('loadeddata', onLoaded);
      }
    };
    
    video.addEventListener('canplaythrough', onLoaded);
    video.addEventListener('loadeddata', onLoaded);

    // Force load attempt
    if (video.load) {
      video.load();
    }

    // Timeout fallback
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve();
        video.removeEventListener('canplaythrough', onLoaded);
        video.removeEventListener('loadeddata', onLoaded);
      }
    }, timeout);
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
    let animationId = null

    async function handleAllVideosLoaded() {
      // Wait a bit for DOM to settle and videos to be added
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const videos = getAllVideos();
      const total = videos.length;
      
      console.log(`Found ${total} videos to load`);
      
      if (total === 0) {
        // No videos, just finish quickly
        gsap.to(progressRef.current, {
          current: 100,
          duration: 1,
          ease: 'power1.out',
          onUpdate: () => {
            if (isMounted) setProgress(Math.round(progressRef.current.current))
          },
          onComplete: () => {
            if (isMounted) setDone(true)
          }
        });
        return;
      }

      let loadedCount = 0;

      // Track each video's load progress
      const loadPromises = videos.map((video, index) =>
        waitForVideoLoaded(video, 8000).then(() => {
          loadedCount += 1;
          const nextProgress = (loadedCount / total) * 100;
          
          // console.log(`Video ${index + 1}/${total} loaded - Progress: ${nextProgress}%`);
          
          // Smoothly animate to next progress value
          if (animationId) {
            gsap.killTweensOf(progressRef.current);
          }
          
          // If this is the last video, go directly to 100 and mark done
          if (loadedCount === total) {
            animationId = gsap.to(progressRef.current, {
              current: 100,
              duration: 0.4,
              ease: 'power1.out',
              onUpdate: () => {
                if (isMounted) {
                  setProgress(Math.round(progressRef.current.current))
                }
              },
              onComplete: () => {
                if (isMounted) {
                  console.log('All videos loaded!');
                  setDone(true)
                }
              }
            });
          } else {
            animationId = gsap.to(progressRef.current, {
              current: nextProgress,
              duration: 0.3,
              ease: 'power1.out',
              onUpdate: () => {
                if (isMounted) {
                  setProgress(Math.round(progressRef.current.current))
                }
              }
            });
          }
        })
      );

      // Wait for all videos to load
      await Promise.all(loadPromises);
    }

    // Start loading process
    if (document.readyState === 'loading') {
      const onReady = () => {
        document.removeEventListener('DOMContentLoaded', onReady);
        handleAllVideosLoaded();
      };
      document.addEventListener('DOMContentLoaded', onReady);
    } else {
      handleAllVideosLoaded();
    }

    return () => {
      isMounted = false;
      if (animationId) {
        gsap.killTweensOf(progressRef.current);
      }
    }
  }, [])

  useEffect(() => {
    if (done && loaderRef.current) {
      gsap.to(loaderRef.current, {
        y: '-100%',
        duration: 1.5,
        ease: 'power4.inOut',
        delay: 0.3,
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
      className={`h-screen w-full fixed top-0 left-0 z-[9999] bg-[#EAE4DF] flex items-center justify-center`}
      style={{
        pointerEvents: done ? 'none' : 'auto',
        transition: 'none'
      }}
    >
      <p
        ref={counterRef}
        className="text-[10vw] max-md:text-[30vw] leading-[1.1] font-medium text-blackshade/10 font-robert"
      >
        {progress}%
      </p>
    </div>
  )
}