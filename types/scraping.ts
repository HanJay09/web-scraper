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
    id?: string;
    url: string;
    type: string;
    timestamp: Date;
    user_id?: string;
    result: {
      title: string;
      description: string;
      price?: number;
      currency?: string;
      isInStock?: boolean;
      image?: string;
      features?: string[];
      [key: string]: unknown;
    };
  }