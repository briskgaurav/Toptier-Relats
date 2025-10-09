import Image from 'next/image'
import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const states = [
  {
    key: 'hero',
    image: '/assets/img/floating/periflex-emi.jpg',
    alt: 'Periflex EMI',
    text: 'More about Periflex EMI',
  },
  {
    key: 'flamability',
    image: '/assets/img/floating/catalog.jpg',
    alt: 'Catalog',
    text: 'View digital catalog',
  },
  {
    key: 'video-grid',
    image: '/assets/img/floating/catalog.jpg',
    alt: 'Video Grid',
    text: 'See our Video Grid',
  },
  {
    key: 'self-closing',
    image: '/assets/img/floating/plas8-na-black.jpg',
    alt: 'Self Closing',
    text: 'More about PLAS8 NA',
  },
  {
    key: 'vhg10',
    image: '/assets/img/floating/plas8-na-black.jpg',
    alt: 'Self Closing',
    text: 'More about PLAS8 NA',
  },
  {
    key: 'ps',
    image: '/assets/img/floating/plas8-na-black.jpg',
    alt: 'Self Closing',
    text: 'More about PLAS8 NA',
  },
  {
    key: 'vsctf',
    image: '/assets/img/floating/plas8-na-black.jpg',
    alt: 'Self Closing',
    text: 'More about PLAS8 NA',
  },
  // Add a new state for the "after flamability" section if needed
  {
    key: 'wsx45',
    image: '/assets/img/floating/revitex-wsx45.jpg', // You can change this image if needed
    alt: 'Catalog After',
    text: 'More about Revitex WSX45', // Change this text to what you want after flamability
  },
  {
    key: 'vsc25',
    image: '/assets/img/floating/revitex-vsc25.jpg', // You can change this image if needed
    alt: 'Catalog After',
    text: 'More about Revitex VSC25', // Change this text to what you want after flamability
  },
  {
    key: 'vsctf',
    image: '/assets/img/floating/revitex-vsctf.jpg', // You can change this image if needed
    alt: 'Catalog After',
    text: 'More about Revitex VSCTF', // Change this text to what you want after flamability
  },
  {
    key: 'perflex-duhura',
    image: '/assets/img/floating/periflex-dura-ha.jpg', // You can change this image if needed
    alt: 'Catalog After',
    text: 'More about Periflex DURA HA', // Change this text to what you want after flamability
  },
]

// Animated Dialog component
function Dialog({ open, onClose, currentState }) {
  const dialogBgRef = useRef(null)
  const dialogBoxRef = useRef(null)
  const [shouldRender, setShouldRender] = useState(open)

  // Animate in/out when open changes
  useEffect(() => {
    if (open) {
      setShouldRender(true)
    }
  }, [open])

  useEffect(() => {
    if (shouldRender && open) {
      // Animate in
      if (dialogBgRef.current && dialogBoxRef.current) {
        gsap.set(dialogBgRef.current, { opacity: 0 })
        gsap.set(dialogBoxRef.current, { opacity: 0, scale: 0.96 })
        gsap.to(dialogBgRef.current, { opacity: 1, duration: 0.25, })
        gsap.to(dialogBoxRef.current, { opacity: 1, scale: 1, duration: 0.38,  delay: 0.08 })
      }
    }
    if (!open && shouldRender) {
      // Animate out
      if (dialogBgRef.current && dialogBoxRef.current) {
        gsap.to(dialogBoxRef.current, {
          opacity: 0,
          scale: 0.96,
          duration: 0.28,
         
        })
        gsap.to(dialogBgRef.current, {
          opacity: 0,
          duration: 0.22,
         
          delay: 0.12,
          onComplete: () => setShouldRender(false),
        })
      } else {
        setShouldRender(false)
      }
    }
  }, [open, shouldRender])

  if (!shouldRender) return null
  return (
    <div
      ref={dialogBgRef}
      data-lenis-prevent
      className="fixed inset-0  z-[555]  flex items-center justify-center bg-black/40"
      onClick={onClose}
      style={{ animation: 'none' }}
    >
      <div
        ref={dialogBoxRef}
        className="bg-white flex rounded-[3vw]  w-[98vw] h-[95vh] relative"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        <div
          className="absolute top-[2vw] right-[3vw] p-[1.5vw] bg-black/5 rounded-full w-[2vw] z-[10] h-[2vw] flex items-center justify-center text-black text-2xl font-bold hover:text-gray-600 cursor-pointer"
          onClick={onClose}
          role="button"
          tabIndex={0}
          aria-label="Close dialog"
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') onClose();
          }}
        >
          <p className='font-fa text-[1vw]'>x</p>
        </div>

        <div style={{ scrollbarWidth: 'none' }} className='w-[50%] overflow-y-scroll p-[3vw] py-[4vw] text-blackshade space-y-[2vw] pb-[5vw] h-full '>
          <h2 className='heading2 text-blackshade'>PLAS8 NA</h2>
          <p className='font-DMMono opacity-50 text-[1vw] leading-[1.1]'>E-Mobility & Automotive</p>
          <p className='text-blackshade w-[80%]'>Warp-knit open sleeve with unique wraparound qualities allowing easy cable bundling after wire harness assembly.
          </p>

          <form className="flex flex-col  w-[100%] max-w-[38vw]">
            <input
              type="text"
              placeholder="Full Name*"
              required
              className="w-full border-b border-[#e0e0e0] bg-transparent outline-none text-[1.7vw] font-medium py-[1.2vw]  placeholder:text-[#999] focus:border-blackshade"

            />
            <input
              type="text"
              placeholder="Company Name*"
              required
              className="w-full border-b border-[#e0e0e0] bg-transparent outline-none text-[1.7vw] font-medium py-[1.2vw]  placeholder:text-[#999] focus:border-blackshade"

            />
            <input
              type="email"
              placeholder="Email*"
              required
              className="w-full border-b border-[#e0e0e0] bg-transparent outline-none text-[1.7vw] font-medium py-[1.2vw]  placeholder:text-[#999] focus:border-blackshade"

            />
            <input
              type="tel"
              placeholder="Phone Number*"
              required
              className="w-full border-b border-[#e0e0e0] bg-transparent outline-none text-[1.7vw] font-medium py-[1.2vw]  placeholder:text-[#999] focus:border-blackshade"

            />
            <textarea
              placeholder="Your message*"
              required
              className="w-full border-b border-[#e0e0e0] bg-transparent outline-none text-[1.7vw] font-medium py-[1.2vw]  placeholder:text-[#999] focus:border-blackshade resize-none"

            />
            <div className="flex  items-center gap-[1vw] mt-[3vw]">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-[1vw] h-[1vw] accent-[#FF5710] rounded-[0.2vw] border border-[#bbb]"
              />
              <label htmlFor="terms" className="text-[.8vw] font-bold  font-DMMono text-blackshade select-none">
                I HAVE READ AND ACCEPT THE{" "}
                <a
                  href="#"
                  className="underline font-mono text-blackshade"
                  tabIndex={0}
                >
                  TERMS & CONDITIONS
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF5710] text-black text-[1.1vw] rounded-[1vw] leading-none mt-[2vw] transition hover:bg-[#e04d0e] active:scale-[0.98]"
              style={{ minHeight: "3.5vw" }}
            >
              Request information
            </button>
          </form>

        </div>
        <div style={{ scrollbarWidth: 'none' }} className='w-[50%] text-blackshade relative overflow-y-scroll p-[3vw] py-[4vw] h-full'>
          <div className='absolute pointer-events-none overflow-hidden w-full h-full top-0 right-0 flex items-start justify-end'>
            <img
              src={"https://toptier.relats.com/wp-content/themes/relats/img/popups/periflex-emi/mask.png"}
              alt="Periflex EMI Mask"
              className="h-auto w-[35vw] object-contain"
            
            />
          </div>
          <div className='space-y-[2vw] py-[3vw] border-b border-black/30'>
            <p className='content'>Solutions</p>
            <div className='space-y-[1vw] '>
              <div className='flex items-center gap-[1vw]'>
                <Image src={'https://toptier.relats.com/wp-content/themes/relats/img/popups/icons/emi-shielding.svg'} className='h-[2vw] w-[2vw]' alt={currentState.alt} width={100} height={100} />
                <p className='text-[1.3vw]'>EMI Shielding</p>
              </div>
              <div className='flex items-center gap-[1vw]'>
                <Image src={'https://toptier.relats.com/wp-content/themes/relats/img/popups/icons/flammability.svg'} className='h-[2vw] w-[2vw]' alt={currentState.alt} width={100} height={100} />
                <p className='text-[1.3vw]'>Flammability</p>
              </div>
              <div className='flex items-center gap-[1vw]'>
                <Image src={'https://toptier.relats.com/wp-content/themes/relats/img/popups/icons/thermal-protection.svg'} className='h-[2vw] w-[2vw]' alt={currentState.alt} width={100} height={100} />
                <p className='text-[1.3vw]'>Thermal Protection</p>
              </div>
            </div>
          </div>
          <div className='space-y-[2vw] py-[3vw] border-b border-black/30'>
            <p className='content'>Application</p>
            <div className='space-y-[1vw] '>
              <div className='flex items-center gap-[1vw]'>
                <Image src={'https://toptier.relats.com/wp-content/themes/relats/img/popups/icons/drivetrain.svg'} className='h-[2vw] w-[2vw]' alt={currentState.alt} width={100} height={100} />
                <p className='text-[1.3vw]'>Drivetrain</p>
              </div>
              <div className='flex items-center gap-[1vw]'>
                <Image src={'https://toptier.relats.com/wp-content/themes/relats/img/popups/icons/engine-compartment.svg'} className='h-[2vw] w-[2vw]' alt={currentState.alt} width={100} height={100} />
                <p className='text-[1.3vw]'>Engine Compartment</p>
              </div>
            
            </div>
          </div>
          <div className='space-y-[2vw] py-[3vw] border-b border-black/30'>
            <p className='content'>Material</p>
            <p className='text-[1.3vw]'>Monofilament Polyester and Tin-copper Wire
            </p>
            <div className='flex items-center gap-[1vw]'>
              <p className='font-DMMono text-[.8vw] uppercase'>Available in</p>
               <div className='flex bg-blackshade/5 p-[.4vw] px-[.8vw] rounded-full items-center gap-[1vw]'>
               <span className='w-[.8vw] h-[.8vw] bg-orange rounded-full'></span>
               <p className='text-[.8vw] font-DMMono uppercase'>Orange</p>
               </div>
            </div>
           
           <div className='w-full h-[32vw] mt-[-1vw]'>
            <img src={'https://toptier.relats.com/wp-content/themes/relats/img/popups/periflex-emi/material.jpg'} className='h-full w-full object-contain' alt={currentState.alt} />
           </div>
            
          </div>
          <div className='space-y-[2vw] py-[3vw] border-b border-black/30'>
            <p className='content'>Temperature</p>
            <p className='text-[1.3vw]'>-70ºC to +150ºC</p>
          </div>
          <div className='space-y-[2vw] py-[3vw] border-b border-black/30'>
            <p className='content'>Flammability</p>
            <p className='text-[1.3vw]'>Self-extinguishing</p>
          </div>
          <div className='space-y-[2vw] py-[3vw] border-b border-black/30'>
            <p className='content'>Expansion Ratio</p>
            <p className='text-[1.3vw]'>1:2 approx. (depending on size)
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default function MorePerflix() {
  const containerRef = useRef(null)
  const imageWrapperRef = useRef(null)
  const textRef = useRef(null)
  const tlRef = useRef(null)
  const [currentState, setCurrentState] = useState(states[0])
  const [pendingState, setPendingState] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Helper to animate content change smoothly
  function animateContentChange(newState) {
    if (!imageWrapperRef.current || !textRef.current) {
      setCurrentState(newState)
      return
    }
    // Fade out current content
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentState(newState)
        // Fade in new content
        gsap.to([imageWrapperRef.current, textRef.current], {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out"
        })
      }
    })
    tl.to([imageWrapperRef.current, textRef.current], {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in"
    })
  }

  // Show animation: fade in, then scaleX in, then content fade in
  function showAnim(stateKey) {
    const state = states.find(s => s.key === stateKey) || states[0]
    setPendingState(state)
    if (!containerRef.current || !imageWrapperRef.current || !textRef.current) return
    if (tlRef.current) tlRef.current.kill()
    const tl = gsap.timeline()
    tl.set(containerRef.current, { opacity: 0, scaleX: 0, display: 'block' })
    tl.set([imageWrapperRef.current, textRef.current], { opacity: 0 })
    tl.to(containerRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0.2)
    tl.to(containerRef.current, { scaleX: 1, duration: 0.4, ease: "power2.out" }, 0.4)
    tl.call(() => {
      animateContentChange(state)
    }, null, 0.6)
    tlRef.current = tl
  }

  // Off animation: scaleX out, then fade out, then content fade out
  function offAnim(stateKey) {
    const state = states.find(s => s.key === stateKey) || states[2]
    setPendingState(state)
    if (!containerRef.current || !imageWrapperRef.current || !textRef.current) return
    if (tlRef.current) tlRef.current.kill()
    const tl = gsap.timeline()
    tl.to([imageWrapperRef.current, textRef.current], { opacity: 0, duration: 0.2, ease: "power2.in" }, 0)
    tl.to(containerRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in" }, 0.2)
    tl.to(containerRef.current, {
      opacity: 0, duration: 0.2, ease: "power2.in", onComplete: () => {
        if (containerRef.current) containerRef.current.style.display = 'none'
        setCurrentState(state)
      }
    }, 0.5)
    tlRef.current = tl
  }

  // Instantly set state (no animation)
  function setStateInstant(stateKey) {
    const state = states.find(s => s.key === stateKey)
    if (!state) return
    if (tlRef.current) tlRef.current.kill()
    setCurrentState(state)
    // Animate opacity to 1 for both image and text using gsap
    if (imageWrapperRef.current && textRef.current) {
      gsap.to([imageWrapperRef.current, textRef.current], { opacity: 1, duration: 0.3, })
    }
  }

  // Show on initial load
  useEffect(() => {
    showAnim('hero');
    // eslint-disable-next-line
  }, []);

  // Setup scrolltriggers for hero, videogrid, and flamability
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.display = 'none'
      gsap.set(containerRef.current, { opacity: 0, scaleX: 0 })
      gsap.set([imageWrapperRef.current, textRef.current], { opacity: 0 })
    }

    const heroTrigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      markers: false,
      onEnterBack: () => showAnim('hero'),
    })

    const videoGridTrigger = ScrollTrigger.create({
      trigger: "#video-grid",
      start: "top 0%",
      end: "bottom top",
      markers: false,
      onEnter: () => offAnim('video-grid'),
    })

    // FLAMABILITY: Split into two triggers
    // 1. When entering flamability, do animation as before
    // FLAMABILITY: Split into two triggers
    // 1. When entering flamability, do animation as before
    const FlamibilityTrigger = ScrollTrigger.create({
      trigger: "#flamability",
      start: "25% 0%",
      end: "73%",
      markers: false,
      onEnter: () => showAnim('flamability'),
      onEnterBack: () => showAnim('flamability'),
      onLeave: () => offAnim('flamability'),
      onLeaveBack: () => offAnim('flamability'),
    });

    const WSX45Trigger = ScrollTrigger.create({
      trigger: "#flamability",
      start: "73% 0%",
      end: "93%",
      markers: false,
      onEnter: () => setStateInstant('wsx45'),
      onEnterBack: () => setStateInstant('wsx45'),
      onLeave: () => setStateInstant('vsc25'),
      onLeaveBack: () => setStateInstant('wsx45'),
    });

    const VSC25Trigger = ScrollTrigger.create({
      trigger: "#flamability",
      start: "93% center",
      end: "93% center",
      markers: false,
      onEnter: () => setStateInstant('vsc25'),
      onEnterBack: () => setStateInstant('vsc25'),
      onLeave: () => setStateInstant('wsx45'),
      onLeaveBack: () => setStateInstant('wsx45'),
    });

    const VSCTFTrigger = ScrollTrigger.create({
      trigger: "#flamability",
      start: "107% top",
      end: "120%",
      markers: false,
      onEnter: () => setStateInstant('vsctf'),
      onEnterBack: () => setStateInstant('vsctf'),
      onLeave: () => offAnim('vsctf'),
      onLeaveBack: () => showAnim('vsctf'),
    });

    const SelfClosingTrigger = ScrollTrigger.create({
      trigger: "#self-closing",
      start: "55% 0%",
      end: "110%",
      markers: false,
      onEnter: () => showAnim('self-closing'),
      onEnterBack: () => showAnim('self-closing'),
      onLeave: () => offAnim('self-closing'),
      onLeaveBack: () => offAnim('self-closing'),
    })
    const productionTrigger = ScrollTrigger.create({
      trigger: "#production",
      start: "40% 0%",
      end: "bottom",
      markers: false,
      onEnter: () => offAnim('production'),
      onEnterBack: () => showAnim('self-closing'),
    })
    const periflex = ScrollTrigger.create({
      trigger: "#periflex",
      start: "15% 0%",
      end: "58%",
      markers: false,
      onEnter: () => showAnim('flamability'),
      onEnterBack: () => showAnim('flamability'),
      onLeave: () => offAnim('flamability'),
      onLeaveBack: () => offAnim('flamability'),
    });
    const periflex2 = ScrollTrigger.create({
      trigger: "#periflex",
      start: "58% 0%",
      end: "65%",
      markers: false,
      onEnter: () => showAnim('perflex-duhura'),
      onEnterBack: () => showAnim('perflex-duhura'),
      onLeave: () => offAnim('perflex-duhura'),
      onLeaveBack: () => offAnim('perflex-duhura'),
    });

    return () => {
      if (tlRef.current) tlRef.current.kill()
      heroTrigger.kill()
      videoGridTrigger.kill()
      FlamibilityTrigger.kill()

      SelfClosingTrigger.kill()
      productionTrigger.kill()
    }
    // eslint-disable-next-line
  }, [])

  // Handler for opening the dialog
  const handleOpenDialog = (e) => {
    e.stopPropagation()
    setDialogOpen(true)
  }

  // Handler for closing the dialog
  const handleCloseDialog = (e) => {
    if (e) e.stopPropagation()
    setDialogOpen(false)
  }

  // Hide on mobile and tablet: use max-lg:hidden (Tailwind) to hide on <= 1024px
  // If you want to hide on max-width 1024px and below, use max-lg:hidden
  // If you want to hide on max-width 768px and below, use max-md:hidden
  // We'll use max-lg:hidden for both mobile and tablet

  return (
    <>
      <div
        ref={containerRef}
        style={{ display: 'none' }}
        className="group fixed z-[50] max-lg:hidden origin-center bottom-[2.5vw] left-1/2 -translate-x-1/2"
      >
        <div
          className="flex items-center bg-white/20 group-hover:bg-white/30 transition-all duration-500 cursor-pointer backdrop-blur-[10px] p-[.2vw] gap-[1vw] rounded-[1.2vw]"
          onClick={handleOpenDialog}
          tabIndex={0}
          role="button"
          aria-label="Open more info dialog"
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleOpenDialog(e)
            }
          }}
        >
          <div
            ref={imageWrapperRef}
            className="h-[3vw] w-[3vw] bg-white overflow-hidden rounded-[1.2vw] "
            style={{ opacity: 1 }}
          >
            <Image
              key={currentState.image}
              src={currentState.image}
              height={100}
              alt={currentState.alt}
              width={100}
              className="h-full w-full scale-125 group-hover:scale-100 transition-all duration-500 object-contain"
              priority
            />
          </div>
          <p
            ref={textRef}
            className="text-blackshade font-medium text-[1vw] pr-[2vw] transition-opacity duration-300"
            style={{ opacity: 1 }}
          >
            {currentState.text}
          </p>
        </div>
      </div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog} currentState={currentState} />
    </>
  )
}
