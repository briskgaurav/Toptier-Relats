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
import FlamabilityMobile from '@/components/Homepage/FlamabilityMobile'
import SelfClosingMobile from '@/components/Homepage/SelfClosingMobile'
import ProductionMobile from '@/components/Homepage/ProductionMobile'
import FooterMobile from '@/components/Footer/FooterMobile'
import TruckMobile from '@/components/Homepage/TruckMobile'
import PeriflexMobile from '@/components/Homepage/PerifexMobile'

export default function page() {
  return (
    <>
      {/* <Loader /> */}
      <Header />
      <Hero />
      <VideoGrid />
      <Flamability />
      <FlamabilityMobile />
      <SelfClosing />
      <SelfClosingMobile />
      <Production />
      <ProductionMobile />
      <Periflex />
      <PeriflexMobile />
      <Truck />
      <TruckMobile />
      <Commitment />
      <WorldWide />
      <Footer />
      <FooterMobile />
    </>
  )
}
