'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Plus, BarChart2, Clock, Database, Settings, LogOut, Search, User } from 'lucide-react'
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { User as SupabaseUser } from "@supabase/supabase-js"

function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      window.location.href = "/";
    }
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center fixed w-full backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-800 z-50">
      <Link className="flex items-center justify-center" href="/">
        <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">ScraperPro</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
          href="/features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
          href="/about"
        >
          About Us
        </Link>
        <Link
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
          href="/faq"
        >
          FAQ
        </Link>
        <Link
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
          href="/contact"
        >
          Contact
        </Link>

        {user ? (
          <>
            <Link
              className="hidden sm:inline-flex text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
              href="/profile"
            >
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </Button>
            </Link>
            <Button size="sm" className="hidden sm:inline-flex" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </>
        ) : (
          <>
            {/* Add login/signup buttons here if needed */}
          </>
        )}
      </nav>
    </header>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [scrapeType, setScrapeType] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  const handleCreateScrape = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Creating new scrape:", { url: scrapeUrl, type: scrapeType });
    // Reset form
    setScrapeUrl("");
    setScrapeType("");
    // You could also add some user feedback here, like a success message
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <nav className="mt-8">
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("overview")}>
              <BarChart2 className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("create")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Scrape
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("recent")}>
              <Clock className="mr-2 h-4 w-4" />
              Recent Scrapes
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("data")}>
              <Database className="mr-2 h-4 w-4" />
              Stored Data
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Welcome Message */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome back, {user?.email ? user.email.split('@')[0].replace(/[0-9]/g, '') || 'User' : 'User'}!
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Here&apos;s an overview of your recent scraping activities and data insights.
                </p>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="create">Create Scrape</TabsTrigger>
                <TabsTrigger value="recent">Recent Scrapes</TabsTrigger>
                <TabsTrigger value="data">Stored Data</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Scrapes</CardTitle>
                      <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,234</div>
                      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Data Points</CardTitle>
                      <Database className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,345,678</div>
                      <p className="text-xs text-muted-foreground">+15% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                      <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">+2 new this week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">API Usage</CardTitle>
                      <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">85%</div>
                      <p className="text-xs text-muted-foreground">of monthly limit</p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest scraping activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {['Amazon Product Scrape', 'eBay Listing Scrape', 'Etsy Shop Scrape'].map((activity, index) => (
                        <div key={index} className="flex items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{activity}</p>
                            <p className="text-sm text-muted-foreground">
                              Completed {index + 1} hour{index !== 0 ? 's' : ''} ago
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="create" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Scrape</CardTitle>
                    <CardDescription>Set up a new web scraping task</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateScrape} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="scrape-url">URL to Scrape</Label>
                        <Input
                          id="scrape-url"
                          placeholder="https://example.com"
                          value={scrapeUrl}
                          onChange={(e) => setScrapeUrl(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="scrape-type">Scrape Type</Label>
                        <Input
                          id="scrape-type"
                          placeholder="e.g., Product Listings, Prices, Reviews"
                          value={scrapeType}
                          onChange={(e) => setScrapeType(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit">Create Scrape</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="recent" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Scrapes</CardTitle>
                    <CardDescription>Your most recent web scraping activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Amazon Electronics', 'eBay Collectibles', 'Etsy Handmade Jewelry', 'Walmart Groceries', 'Best Buy Laptops'].map((scrape, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{scrape}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(Date.now() - (index * 3600000)).toLocaleString()}
                            </p>
                          </div>
                          <Button variant="outline">View Results</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="data" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Stored Data</CardTitle>
                    <CardDescription>Manage your scraped data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Input placeholder="Search stored data..." />
                        <Button type="submit">
                          <Search className="h-4 w-4" />
                          <span className="sr-only">Search</span>
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {['Product Listings', 'Price Comparisons', 'Customer Reviews', 'Competitor Analysis', 'Market Trends'].map((dataset, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">{dataset}</p>
                              <p className="text-sm text-muted-foreground">
                                Last updated: {new Date(Date.now() - (index * 86400000)).toLocaleDateString()}
                              </p>
                            </div>
                            <Button variant="outline">Download</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="api-key">API Key</Label>
                        <Input id="api-key" placeholder="Your API Key" />
                      </div>
                      <Button>Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}