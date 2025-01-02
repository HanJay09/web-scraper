
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
    // Add other fields as needed
  };
}

export async function createScrape(
    url: string,
    options: ScrapingOptions = {}
  ): Promise<ScrapingResponse> {
    const requestBody = JSON.stringify({
        url: url,
        ...options
      });
    console.log('Request Body:', requestBody);
    const response = await fetch('http://localhost:3001/scrape', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        options: {
          useChrome: options.useChrome ?? false,
          premiumProxy: options.premiumProxy ?? true,
          proxyCountry: "MY",
          waitForNetworkRequests: options.waitForNetworkRequests ?? false,
        },
      }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  }
  
  