import React, { useState } from 'react'
import Hero from './Hero'
import Carrousel from './Carrousel'
import FeaturedProducts from './FeaturedProducts'


const Home = () => {
  
  return (
    <>
    <Hero/>
    <FeaturedProducts />
    <Carrousel/>
    </>
  )
}

export default Home
