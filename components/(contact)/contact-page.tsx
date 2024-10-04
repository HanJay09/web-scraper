'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

export function ContactPageComponent() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { name, email, message })
    // Reset form fields
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 px-4">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400 mb-8">
              Contact Us
            </h1>
            <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-12">
              Have questions or need assistance? We&apos;re here to help!
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we help you?"
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                      <p className="text-gray-700 dark:text-gray-300">support@scraperpro.com</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                      <p className="text-gray-700 dark:text-gray-300">+60 (12) 345-6789</p>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                      <p className="text-gray-700 dark:text-gray-300">123 Tech Street, San Francisco, CA 94105</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                    <p className="text-gray-700 dark:text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM (PST)</p>
                    <p className="text-gray-700 dark:text-gray-300">Saturday - Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}