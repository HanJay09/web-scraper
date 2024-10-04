'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Cpu, BarChart, Lock, Code, Bell, Gauge, RefreshCcw, Layers } from "lucide-react"


export default function FeaturesPageComponent() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400 mb-8">
              Powerful Features for Advanced Web Scraping
            </h1>
            <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Discover the cutting-edge tools and capabilities that make ScraperPro the ultimate choice for e-commerce data extraction and analysis.
            </p>
            <Tabs defaultValue="scraping" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="scraping">Scraping</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="integration">Integration</TabsTrigger>
                <TabsTrigger value="management">Management</TabsTrigger>
              </TabsList>
              <TabsContent value="scraping" className="mt-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Multi-platform Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Extract data from Amazon, eBay, Walmart, and other major e-commerce platforms with ease. Our specialized scrapers are optimized for each platform&apos;s unique structure.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Cpu className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        AI-Powered Extraction
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Leverage advanced machine learning algorithms to accurately extract product details, prices, reviews, and more, even from complex and dynamic web pages.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <RefreshCcw className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Real-time Updates
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Stay ahead of the competition with real-time data updates. Set custom intervals for automatic re-scraping to capture price changes and new product listings instantly.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lock className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Ethical Scraping
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Our platform respects robots.txt files and implements rate limiting to ensure ethical and compliant data collection, maintaining good relationships with target websites.
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="analysis" className="mt-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Advanced Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Transform raw data into actionable insights with our powerful analytics tools. Visualize trends, compare prices, and identify market opportunities at a glance.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Layers className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Customizable Dashboards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Create personalized dashboards tailored to your specific needs. Drag-and-drop widgets to monitor key metrics and get a comprehensive view of your data.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bell className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Intelligent Alerts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Set up custom alerts for price changes, stock levels, or new product launches. Receive notifications via email, SMS, or push notifications to stay informed.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Gauge className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Competitor Tracking
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Monitor your competitors&apos; pricing strategies, product offerings, and customer reviews. Gain valuable insights to refine your own business strategies.
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="integration" className="mt-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Code className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Robust API
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Integrate ScraperPro seamlessly into your existing workflows with our comprehensive RESTful API. Access all features programmatically and automate your data processes.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Third-party Integrations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Connect ScraperPro with popular tools like Zapier, Google Sheets, and Tableau. Export data directly to your preferred platforms for seamless analysis and reporting.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Cpu className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Webhooks
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Set up webhooks to receive real-time notifications when new data is available or when specific conditions are met, enabling automated actions in your systems.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lock className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Secure Data Transfer
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      All data transfers are encrypted using industry-standard protocols. Access your data securely via SFTP or our encrypted API endpoints.
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="management" className="mt-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Layers className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Project Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Organize your scraping tasks into projects. Set up multiple scraping jobs, schedule runs, and manage your data collection efforts efficiently from a central dashboard.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <RefreshCcw className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Automated Workflows
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Create custom workflows to automate your entire data pipeline. From scraping to analysis and reporting, streamline your processes with our powerful automation tools.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Performance Monitoring
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Track the performance of your scraping jobs in real-time. Monitor success rates, data quality, and system resources to ensure optimal operation of your data collection.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bell className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                        Scalability
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Our cloud-based infrastructure automatically scales to meet your data collection needs. Handle millions of data points without worrying about server management or capacity.
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-gradient-to-br from-indigo-600 to-pink-600 dark:from-indigo-900 dark:to-pink-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
                Ready to Harness the Power of ScraperPro?
              </h2>
              <p className="mx-auto max-w-[700px] text-indigo-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start extracting valuable insights from e-commerce data today.
              </p>
              <Button className="bg-white text-indigo-600 hover:bg-indigo-100">
                Start Your Free Trial
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}