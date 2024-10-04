'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Scroll, ShieldCheck, Scale, Calendar } from "lucide-react"

export function TermsPageComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400 mb-8">
              Terms of Service
            </h1>
            <div className="flex justify-center items-center mb-8 text-gray-600 dark:text-gray-400">
              <Calendar className="w-5 h-5 mr-2" />
              <p className="text-sm">Last Updated: October 4, 2024</p>
            </div>
            <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-12">
              Please read these terms carefully before using ScraperPro&apos;s services.
            </p>
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Scroll className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    By accessing or using ScraperPro&apos;s services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <ShieldCheck className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                    2. Use of Services
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You agree to use ScraperPro&apos;s services only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that your use of our services complies with applicable laws and regulations, including those related to data protection and privacy.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    You must not use our services to scrape websites that prohibit such activities in their terms of service or robots.txt file. ScraperPro reserves the right to terminate your access to the services if you violate these terms.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Scale className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                    3. Intellectual Property
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    The ScraperPro platform, including its software, design, and content, is protected by copyright, trademark, and other laws. You may not modify, reproduce, distribute, or create derivative works based on our services without our explicit permission.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Any data you collect using our services belongs to you, but you grant ScraperPro a non-exclusive, worldwide, royalty-free license to use, copy, and display this data solely for the purpose of providing and improving our services.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <ShieldCheck className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                    4. Privacy and Data Protection
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our collection and use of personal information in connection with your access to and use of the Services is described in our Privacy Policy. By using our services, you agree that ScraperPro may use such data in accordance with our Privacy Policy.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Scale className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                    5. Limitation of Liability
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    ScraperPro shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Scroll className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                    6. Modifications to Terms
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    ScraperPro reserves the right to modify these Terms at any time. We will provide notice of significant changes to these Terms by posting the new Terms on our website. Your continued use of our services after such modifications will constitute your acknowledgment of the modified Terms.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-700 dark:text-gray-300">
                By using ScraperPro&apos;s services, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}