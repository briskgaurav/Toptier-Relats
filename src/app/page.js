import React from 'react'
import Hero from '../components/Homepage/Hero'
import Header from '@/components/Header/Header'
import VideoGrid from '@/components/Homepage/VideoGrid'
import Flamability from '@/components/Homepage/Flamability'
import Production from '@/components/Homepage/Production'
import Periflex from '@/components/Homepage/Periflex'
import WorldWide from '@/components/Homepage/WorldWide'
import Footer from '@/components/Footer/Footer'
import Truck from '@/components/Homepage/Truck'
import Commitment from '@/components/Homepage/Commitment'
import Loader from '@/components/Loader/Loader'
import SelfClosing from '@/components/Homepage/SelfClosing'

export default function page() {
  return (
    <>
      {/* <Loader /> */}
      <Header />
      <Hero />
      <VideoGrid />
      <Flamability />
      <SelfClosing />
      <Production />
      <Periflex />
      <Truck />
      <Commitment />
      <WorldWide />
      <Footer />
    </>
  )
}
