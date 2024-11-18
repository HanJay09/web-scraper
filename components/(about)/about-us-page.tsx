'use client'

{/*import { Button } from "@/components/ui/button"*/}
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Lightbulb, TrendingUp, Shield } from "lucide-react"
import Image from "next/image"

export function AboutUsPageComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400 mb-8">
              About ScraperPro
            </h1>
            <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Empowering businesses with cutting-edge web scraping technology and actionable e-commerce insights.
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 mb-4 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-2xl font-bold mb-2">Our Team</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    A diverse group of data scientists, engineers, and e-commerce experts dedicated to revolutionizing how businesses gather and utilize online data.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardContent className="p-6">
                  <Target className="w-12 h-12 mb-4 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    To democratize access to e-commerce data, enabling businesses of all sizes to make informed decisions and thrive in the digital marketplace.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardContent className="p-6">
                  <Lightbulb className="w-12 h-12 mb-4 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    A world where every business, regardless of size, has the tools and insights to compete effectively in the global e-commerce landscape.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Our Story</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg"
                  alt="ScraperPro team"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  Founded in 2024, ScraperPro emerged from a simple idea: that access to accurate, timely e-commerce data shouldn&apos;t be a privilege reserved for tech giants. Our founders, a group of data scientists and e-commerce enthusiasts, recognized the immense potential of web scraping technology to level the playing field for businesses of all sizes.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  What started as a small project in a garage has now grown into a leading web scraping platform, trusted by thousands of businesses worldwide. Our journey has been driven by continuous innovation, ethical data practices, and an unwavering commitment to our clients&apos; success.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-gradient-to-br from-indigo-100 to-pink-100 dark:from-gray-800 dark:to-gray-700">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Our Values</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardContent className="p-6">
                  <TrendingUp className="w-10 h-10 mb-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We&apos;re constantly pushing the boundaries of what&apos;s possible in web scraping and data analysis.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardContent className="p-6">
                  <Shield className="w-10 h-10 mb-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xl font-bold mb-2">Ethical Data Practices</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We believe in responsible data collection and usage, always respecting website policies and user privacy.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardContent className="p-6">
                  <Users className="w-10 h-10 mb-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xl font-bold mb-2">Customer Success</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Your success is our success. We&apos;re committed to providing unparalleled support and guidance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-gradient-to-br from-indigo-600 to-pink-600 dark:from-indigo-900 dark:to-pink-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
                Join Us in Shaping the Future of E-commerce
              </h2>
              <p className="mx-auto max-w-[700px] text-indigo-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Experience the power of ScraperPro and unlock the potential of your business.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}