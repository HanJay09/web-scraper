import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { Buffer } from 'buffer';
import dotenv from 'dotenv';

// Configure dotenv at the very beginning
dotenv.config();

const app = express();
const port = 3001;

// Add some debug logging
console.log('Environment variables loaded:', {
  username: process.env.SCRAPING_BOT_USERNAME ? 'Present' : 'Missing',
  apiKey: process.env.SCRAPING_BOT_API_KEY ? 'Present' : 'Missing'
});

app.use(cors());
app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { url, options } = req.body;
  console.log('Received request:', { url, options });

  const username = process.env.SCRAPING_BOT_USERNAME;
  const apiKey = process.env.SCRAPING_BOT_API_KEY;

  if (!username || !apiKey) {
    console.error('Missing credentials:', { 
      hasUsername: !!username, 
      hasApiKey: !!apiKey 
    });
    return res.status(400).json({ 
      error: 'Missing API credentials', 
      details: {
        username: !!username,
        apiKey: !!apiKey
      }
    });
  }

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const auth = Buffer.from(`${username}:${apiKey}`).toString('base64');
  
  try {
    console.log('Making request to scraping-bot.io with URL:', url);
    const response = await fetch('http://api.scraping-bot.io/scrape/retail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        options: {
          useChrome: options?.useChrome ?? false,
          premiumProxy: options?.premiumProxy ?? true,
          proxyCountry: "MY",
          waitForNetworkRequests: options?.waitForNetworkRequests ?? false,
        },
      }),
    });

    const data = await response.json();
    console.log('Response from scraping-bot.io:', data);
    res.json(data);
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Scraping error:', err);
    res.status(500).json({ error: 'Scraping error', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});