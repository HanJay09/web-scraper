'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Database, Eye, Lock, RotateCw, MessageSquare, Scale } from "lucide-react"

export function PrivacyPolicyPageComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400 mb-8">
              Privacy Policy
            </h1>
            <div className="flex justify-center items-center mb-8 text-gray-600 dark:text-gray-400">
              <Shield className="w-5 h-5 mr-2" />
              <p className="text-sm">Last Updated: October 4, 2024</p>
            </div>
            <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-12">
              At ScraperPro, we are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Database className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                    1. Information We Collect
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, payment information, and any other information you choose to provide.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Eye className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                    2. How We Use Your Information
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    We use the information we collect to provide, maintain, and improve our services, to process your transactions, to send you technical notices and support messages, and to communicate with you about products, services, offers, and events.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Lock className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                    3. Data Security
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    We implement appropriate technical and organizational measures to protect the security, integrity, and confidentiality of your personal information. However, no security system is impenetrable and we cannot guarantee the security of our systems 100%.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <RotateCw className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                    4. Data Retention
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    We retain personal information we collect from you where we have an ongoing legitimate business need to do so (for example, to provide you with a service you have requested or to comply with applicable legal requirements).
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <MessageSquare className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                    5. Your Rights
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    You have the right to access, update, or delete your personal information. You can also object to processing of your personal information, ask us to restrict processing of your personal information or request portability of your personal information.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Scale className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                    6. Changes to This Privacy Policy
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    We may update this privacy policy from time to time in response to changing legal, technical or business developments. When we update our privacy policy, we will take appropriate measures to inform you, consistent with the significance of the changes we make.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about this Privacy Policy, please contact us at privacy@scraperpro.com.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}