"use client"

import React from 'react'
import { HomePageComponent } from '../components/home-page'
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"


export default function Home() {
  return <>
    <div className='flex flex-col min-h-screen'>
      <Header />
      <HomePageComponent />
      <Footer />
    </div>
  </>
}