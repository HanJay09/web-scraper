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
  };
}

export async function createScrape(
  url: string,
  options: ScrapingOptions = {}
): Promise<ScrapingResponse> {
  try {
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to scrape data');
    }

    const scrapedData = await response.json();

    // Save to Supabase
    const { error: saveError } = await supabase
      .from('scrapes')
      .insert({
        url,
        user_id: session.user.id,
        scrape_data: scrapedData,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving scrape result:', saveError);
      throw new Error('Failed to save scrape result');
    }

    return scrapedData;
  } catch (error) {
    console.error('Error in createScrape:', error);
    throw error;
  }
}

export async function getRecentScrapes() {
  try {
    const { data, error } = await supabase
      .from('scrapes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching recent scrapes:', error);
    throw error;
  }
}