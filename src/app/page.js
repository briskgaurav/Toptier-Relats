import React from 'react'
import Hero from '../components/Homepage/Hero'
import Header from '@/components/Header/Header'
import VideoGrid from '@/components/Homepage/VideoGrid'
import Flamability from '@/components/Homepage/Flamability'
import CableTypes from '@/components/Homepage/CableTypes'
import Production from '@/components/Homepage/Production'
import Periflex from '@/components/Homepage/Periflex'

export default function page() {
  return (
    <>
      <Header />
      <Hero />
      <VideoGrid />
      <Flamability />
      <Production />
      <Periflex />
   
    </>
  )
}
