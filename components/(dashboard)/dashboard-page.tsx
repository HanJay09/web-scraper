/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Plus, BarChart2, Clock, Database, Settings, ExternalLink, Download } from 'lucide-react'
import { supabase } from "@/lib/supabaseClient"
import { User as SupabaseUser } from "@supabase/supabase-js"
import { createScrape } from '@/lib/scrapingApi'
import { ScrapeResult } from "@/types/scraping"
import { toRelativeString } from "@/utils/date"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from '@/components/Footer';
import { Alert, AlertDescription } from "@/components/ui/alert"

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedScrape, setSelectedScrape] = useState<any | null>(null);
  const [displayName, setDisplayName] = useState('')
  const [isResetEmailSent, setIsResetEmailSent] = useState(false)
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setDisplayName(user.user_metadata.full_name)
    }
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: displayName }
      });

      if (error) throw error;
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      setUpdateMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Error updating profile' 
      });
      toast.error('Error updating profile');
    }
  };

  const handlePasswordResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        user?.email || '',
        {
          redirectTo: `${window.location.origin}/auth/update-password?next=/dashboard`
        }
      );
  
      if (error) throw error;
  
      setIsResetEmailSent(true);
      setUpdateMessage({ 
        type: 'success', 
        text: 'Password reset email sent! Please check your email to complete the process.' 
      });
      toast.success('Password reset email sent!');
    } catch (error) {
      setUpdateMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Error sending reset email' 
      });
      toast.error('Error sending reset email');
    }
  };

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
        type: 'scrape'
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

  const handleViewDetails = (scrape: unknown) => {
    setSelectedScrape(scrape)
    setActiveTab("details")
  }

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

      // Then try to insert into Supabase with retry logic
      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        const { data: insertedData, error: insertError } = await supabase
          .from('scrapes')
          .insert({
            url: normalizedUrl,
            scrape_data: { data: result.data },
            user_id: user?.id,
            
          })
          .select()
          .single();
  
        if (!insertError) {
          // Success! Add to UI
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
          toast.success('Scraping completed successfully!');
          break;
        }
  
        // If there's an error, wait a bit and retry
        await new Promise(resolve => setTimeout(resolve, 1000));
        retryCount++;
        
        // Only show error on final retry
        if (retryCount === maxRetries) {
          console.error('Supabase insert error:', insertError);
          throw new Error('Failed to save scrape data after multiple attempts');
        }
      }
  
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while scraping');
      toast.error(err instanceof Error ? err.message : 'An error occurred while scraping');
    } finally {
      setIsLoading(false);
    }
  
  };

  // Component for displaying scrape details
  const ScrapeDetailsContent = () => {
    if (!selectedScrape) {
      return (
        <Card>
          <CardContent className="py-8">
            <div className="text-center text-muted-foreground">
              No scrape selected. Please select a scrape to view details.
            </div>
          </CardContent>
        </Card>
      )
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>Scrape Details</CardTitle>
          <CardDescription>Detailed information about your selected scrape</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-lg font-medium">{selectedScrape.result.title}</p>
                <p className="text-sm text-muted-foreground">
                  Scraped {toRelativeString(selectedScrape.timestamp)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => window.open(selectedScrape.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Site
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDownload(selectedScrape)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Data (JSON format)
                </Button>
              </div>
            </div>
            {selectedScrape.result.image && (
              <div className="mt-4">
                <img
                  src={selectedScrape.result.image}
                  alt="Scrape preview"
                  className="w-full max-w-md rounded-lg shadow-md"
                />
              </div>
            )}
            <div className="mt-4 space-y-2">
              <p><strong>Description:</strong> {selectedScrape.result.description}</p>
              <p><strong>Price:</strong> {selectedScrape.result.currency}{selectedScrape.result.price}</p>
              <p><strong>Stock Status:</strong> {selectedScrape.result.isInStock ? 'In Stock' : 'Out of Stock'}</p>
              <p><strong>URL:</strong> {selectedScrape.url}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

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
                  <Button variant="outline" onClick={() => handleViewDetails(scrape)}>View Details</Button>
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
            <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Profile Settings
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
                {/* <TabsTrigger value="details">Details</TabsTrigger> */}
                <TabsTrigger value="settings">Profile Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Scrapes</CardTitle>
                      <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{scrapeResults.length}</div>
                      <p className="text-xs text-muted-foreground">Total scrapes performed</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Data Points</CardTitle>
                      <Database className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{scrapeResults.length * 5}</div>
                      <p className="text-xs text-muted-foreground">Total data points collected</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                      <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1</div>
                      <p className="text-xs text-muted-foreground">Current active project</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">API Usage</CardTitle>
                      <BarChart2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{scrapeResults.length}%</div>
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
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Instructions</h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">How to use the scraping feature:</p>
                        <ol className="mt-4 list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <li>Enter the URL of the e-commerce website you want to scrape in the input field above.</li>
                          <li>Click the &quot;Create Scrape&quot; button to initiate the scraping process.</li>
                          <li>Wait for the scraping to complete. This may take a few seconds.</li>
                          <li>Once completed, you can view the results in the &quot;Recent Scrapes&quot; tab.</li>
                          <li>For more detailed information, click on &quot;View Details&quot; for any specific scrape.</li>
                        </ol>
                      </div>
                    </div>
              </TabsContent>
              <TabsContent value="recent" className="space-y-4">
                <RecentScrapesContent />
              </TabsContent>
              <TabsContent value="details" className="space-y-4">
                <ScrapeDetailsContent />
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Profile</CardTitle>
                  <CardDescription>Manage your profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {updateMessage && (
                    <Alert variant={updateMessage.type === 'success' ? 'default' : 'destructive'}>
                      <AlertDescription>{updateMessage.text}</AlertDescription>
                    </Alert>
                  )}
                  
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your display name"
                      />
                    </div>
                    <Button type="submit">Update Profile</Button>
                  </form>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        To change your password, we&apos;ll send you an email with a secure reset link.
                        Click the button below to start the process.
                      </p>
                      {isResetEmailSent ? (
                        <Alert>
                          <AlertDescription>
                            Password reset email sent! Please check your email to complete the process.
                            If you don&apos;t see the email, please check your spam folder.
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <Button onClick={handlePasswordResetRequest}>
                          Send Password Reset Email
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  )
}