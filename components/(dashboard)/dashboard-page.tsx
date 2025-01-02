'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Plus, BarChart2, Clock, Database, Settings, Search, Download, ExternalLink } from 'lucide-react'
import { supabase } from "@/lib/supabaseClient"
import { User as SupabaseUser } from "@supabase/supabase-js"
import { createScrape } from '@/lib/scrapingApi'
import { ScrapeResult } from "@/types/scraping"
import { toRelativeString } from "@/utils/date"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const downloadJSON = (data: unknown, filename: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrapeResults, setScrapeResults] = useState<ScrapeResult[]>([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState<ScrapeResult[]>([])

  useEffect(() => {
    const filtered = scrapeResults.filter(scrape => 
      scrape.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scrape.result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scrape.result.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredData(filtered)
  }, [searchTerm, scrapeResults])

  const handleDownload = (scrape: ScrapeResult) => {
    const filename = `scrape-${scrape.id || Date.now()}-${new Date(scrape.timestamp).toISOString().split('T')[0]}.json`
    const downloadData = {
      url: scrape.url,
      timestamp: scrape.timestamp,
      data: scrape.result,
      type: scrape.type
    }
    downloadJSON(downloadData, filename)
    toast.success('Download started!', {
      position: "top-right",
      autoClose: 2000,
    })
  }

  useEffect(() => {
    const fetchScrapes = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('scrapes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching scrapes:', error);
        return;
      }

      setScrapeResults(data.map(scrape => ({
        id: scrape.id,
        url: scrape.url,
        timestamp: new Date(scrape.created_at),
        result: scrape.scrape_data.data,
        type: 'scrape' // Add the missing 'type' property
      })));
    };

    fetchScrapes();
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  const handleCreateScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!url) {
        throw new Error('Please enter a URL to scrape');
      }

      let normalizedUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        normalizedUrl = `https://${url}`;
      }

      const result = await createScrape(normalizedUrl, {
        useChrome: false,
        premiumProxy: false,
      });
    

    // Store the scrape in Supabase
    const { data: insertedData, error: insertError } = await supabase
      .from('scrapes')
      .insert({
        url: normalizedUrl,
        scrape_data: { data: result.data },
        user_id: user?.id,
        type: 'product'
      })
      .select()
      .single();

    if (insertError) {
      throw new Error('Failed to save scrape data');
    }

    // Update local state with the inserted data
    if (insertedData) {
      const scrapeResult: ScrapeResult = {
        id: insertedData.id,
        url: insertedData.url,
        timestamp: new Date(insertedData.created_at),
        type: 'product',
        user_id: insertedData.user_id,
        result: {
          title: result.data.title,
          description: result.data.description,
          price: result.data.price,
          currency: result.data.currency,
          isInStock: result.data.isInStock,
          image: result.data.image
        }
      };
      
      setScrapeResults(prev => [scrapeResult, ...prev]);
    }
    
    setUrl("");
    
    toast.success('Scraping completed successfully!', {
      position: "top-right",
      autoClose: 3000,
    });
  } catch (err) {
    setError(err instanceof Error ? err.message : 'An error occurred while scraping');
    toast.error(err instanceof Error ? err.message : 'An error occurred while scraping');
  } finally {
    setIsLoading(false);
  }
};

  const StoredDataContent = () => (
    <Card>
      <CardHeader>
        <CardTitle>Stored Data</CardTitle>
        <CardDescription>Search and download your scraped product data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Search by title, description, or URL..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {filteredData.length > 0 ? (
              filteredData.map((scrape) => (
                <div key={scrape.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {scrape.result.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {toRelativeString(scrape.timestamp)}
                        </p>
                      </div>
                      {scrape.result.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={scrape.result.image} 
                          alt={scrape.result.title}
                          className="w-16 h-16 object-cover rounded ml-4"
                        />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {scrape.result.description}
                    </p>
                    {scrape.result.price && (
                      <p className="text-sm font-medium">
                        Price: {scrape.result.currency}{scrape.result.price}
                      </p>
                    )}
                    <p className="text-sm">
                      Stock Status: {scrape.result.isInStock ? 'In Stock' : 'Out of Stock'}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(scrape.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(scrape)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No matching scrapes found
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const RecentScrapesContent = () => (
    <Card>
      <CardHeader>
        <CardTitle>Recent Scrapes</CardTitle>
        <CardDescription>Your most recent web scraping activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scrapeResults.length > 0 ? (
            scrapeResults.slice(0, 5).map((scrape) => (
              <div key={scrape.id} className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {scrape.result.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {toRelativeString(new Date(scrape.timestamp))}
                  </p>
                  {scrape.result.price && (
                    <p className="text-sm font-medium">
                      Price: {scrape.result.currency}{scrape.result.price}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => window.open(scrape.url, '_blank')}
                  >
                    Visit Site
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(scrape)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No scrapes yet. Create your first scrape to see results here.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
  
  const RecentActivity = () => (
    <div className="space-y-8">
      {scrapeResults.slice(0, 3).map((scrape, index) => (
        <div key={index} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {scrape.result.title || 'Web Scrape'}
            </p>
            <p className="text-sm text-muted-foreground">
              Completed {toRelativeString(new Date(scrape.timestamp))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
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
                    <RecentActivity />
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
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      {error && (
                        <div className="text-red-500 text-sm mt-2">
                          {error}
                        </div>
                      )}
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Scraping..." : "Create Scrape"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="recent" className="space-y-4">
                <RecentScrapesContent />
              </TabsContent>
              <TabsContent value="data" className="space-y-4">
              <StoredDataContent />
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
      <ToastContainer />
    </div>
  )
}