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
      const requestBody = {
        url,
        options: {
          useChrome: options.useChrome ?? false,
          premiumProxy: options.premiumProxy ?? true,
          proxyCountry: "MY",
          waitForNetworkRequests: options.waitForNetworkRequests ?? false,
        },
      };
  
      console.log('Sending request to backend:', requestBody);
  
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
        console.error('Server returned error:', data);
        throw new Error(data.error || 'Unknown error occurred');
      }
  
      return data;
    } catch (error) {
      console.error('Error in createScrape:', error);
      throw error;
    }
  }