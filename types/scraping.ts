export interface ScrapeData {
    title: string;
    description: string;
    price: number;
    currency: string;
    isInStock: boolean;
    siteURL: string;
    image?: string;
    shippingFees?: number;
    brand?: string;
    category?: {
      name: string;
      url: string;
    };
  }
  
  export interface ScrapeResult {
    url: string;
    type: string;
    timestamp: Date;
    result: ScrapeData;
  }