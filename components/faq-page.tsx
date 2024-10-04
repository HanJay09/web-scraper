'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is ScraperPro?",
    answer: "ScraperPro is an advanced web scraping platform designed to extract data from e-commerce websites such as Amazon. It provides powerful tools for businesses to gather and analyze product information, prices, and market trends."
  },
  {
    question: "Is ScraperPro legal to use?",
    answer: "ScraperPro is designed to be used in compliance with website terms of service and robots.txt files. However, it's the user's responsibility to ensure they have the right to scrape data from target websites and to use the extracted data in accordance with applicable laws and regulations."
  },
  {
    question: "How does ScraperPro handle rate limiting and IP blocks?",
    answer: "ScraperPro uses advanced techniques such as rotating IP addresses, intelligent request throttling, and mimicking human behavior to avoid detection and respect website rate limits. However, for high-volume scraping, we recommend using our proxy integration feature for additional protection."
  },
  {
    question: "Can I integrate ScraperPro with my existing tools and workflows?",
    answer: "Yes, ScraperPro offers a robust API that allows for seamless integration with your existing tools and workflows. We also provide pre-built integrations with popular platforms like Zapier, Google Sheets, and Tableau for easy data export and analysis."
  },
  {
    question: "What kind of support does ScraperPro offer?",
    answer: "We offer comprehensive support including detailed documentation, video tutorials, and a knowledge base. Our premium plans include priority email support, and our enterprise plan offers dedicated account management and custom solution development."
  },
  {
    question: "How does pricing work for ScraperPro?",
    answer: "ScraperPro offers tiered pricing plans based on the volume of data you need to scrape and the features you require. We have plans suitable for individual developers, small businesses, and large enterprises. For detailed pricing information, please visit our pricing page or contact our sales team."
  }
]

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="px-4 lg:px-6 h-16 flex items-center fixed w-full backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-800 z-50">
        <Link className="flex items-center justify-center" href="/">
          <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">ScraperPro</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors" href="/features">
            Features
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors" href="/about">
            About Us
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors" href="/contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 px-4">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400 mb-8">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-12">
              Find answers to common questions about ScraperPro and our services.
            </p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-6 text-left"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="font-semibold">{faq.question}</span>
                      {openIndex === index ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                    {openIndex === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 px-4 md:px-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">ScraperPro</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 sm:mt-0">
            © 2023 ScraperPro. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors" href="/terms">
              Terms
            </Link>
            <Link className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors" href="/privacy">
              Privacy
            </Link>
            <Link className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors" href="#">
              Cookies
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}