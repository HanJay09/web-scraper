import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ScrapingOptions {
  useChrome?: boolean;
  premiumProxy?: boolean;
  proxyCountry?: string | null;
  waitForNetworkRequests?: boolean;
}

interface ScrapingResponse {
  error: string | null;
  data: {
    title: string;
    description: string;
    price: number;
    currency: string;
    isInStock: boolean;
    siteURL: string;
    // ... other fields
  };
}

export async function createScrape(
    url: string,
    options: ScrapingOptions = {}
  ): Promise<ScrapingResponse> {
    try {
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        throw new Error('You must be logged in to create scrapes');
      }
  
      const requestBody = {
        url,
        options: {
          useChrome: options.useChrome ?? false,
          premiumProxy: options.premiumProxy ?? true,
          proxyCountry: "MY",
          waitForNetworkRequests: options.waitForNetworkRequests ?? false,
        },
      };
  
      const response = await fetch('http://localhost:3001/scrape', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to scrape data');
      }
  
      // Save to Supabase with user_id
      const { error: saveError } = await supabase
        .from('scrapes')
        .insert({
          url,
          scrape_data: data,
          user_id: session.user.id, // Add the user_id explicitly
          created_at: new Date().toISOString()
        })
        .select()
        .single();
  
      if (saveError) {
        console.error('Error saving scrape result:', saveError);
        throw new Error('Failed to save scrape result');
      }
  
      return data;
    } catch (error) {
      console.error('Error in createScrape:', error);
      throw error;
    }
  }

// Function to fetch recent scrapes for the current user
export async function getRecentScrapes() {
  try {
    const { data, error } = await supabase
      .from('scrapes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10); // Adjust limit as needed

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching recent scrapes:', error);
    throw error;
  }
}