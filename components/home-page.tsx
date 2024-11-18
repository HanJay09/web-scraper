'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle, LineChart, ShieldCheck } from "lucide-react"
import Link from 'next/link'


export function HomePageComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400">
                  Unleash the Power of E-commerce Data
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-300">
                  ScraperPro: Your ultimate web scraping solution for Amazon and beyond. Transform raw data into actionable insights.
                </p>
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 text-gray-900 dark:text-white">
              Why Choose ScraperPro?
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-gray-700 dark:to-gray-800 border-none shadow-lg">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <CheckCircle className="h-12 w-12 mb-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Precision Extraction</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our AI-powered algorithms ensure unparalleled accuracy in data extraction from complex e-commerce platforms.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-pink-50 to-white dark:from-gray-700 dark:to-gray-800 border-none shadow-lg">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <LineChart className="h-12 w-12 mb-4 text-pink-600 dark:text-pink-400" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Real-time Insights</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Transform raw data into actionable insights with our powerful analytics dashboard and customizable reports.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-gray-700 dark:to-gray-800 border-none shadow-lg">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <ShieldCheck className="h-12 w-12 mb-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Ethical Compliance</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Rest easy knowing our platform adheres to website terms of service and respects ethical data collection practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-indigo-600 to-pink-600 dark:from-indigo-900 dark:to-pink-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
                  Ready to Revolutionize Your Data Strategy?
                </h2>
                <p className="mx-auto max-w-[700px] text-indigo-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join industry leaders who trust ScraperPro for their mission-critical data needs.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 max-w-[600px]">
                Have questions or need more information? Get in touch with our team.
              </p>
              <div className="flex justify-center w-full">
                <Link href="/contact"> 
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}