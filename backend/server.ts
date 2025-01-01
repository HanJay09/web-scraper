import express from 'express';
import cors from 'cors'; // Import cors
import fetch from 'node-fetch';
import { Buffer } from 'buffer';

const app = express();
const port = 3001;

// Enable CORS for all origins (you can restrict it later to specific domains if needed)
app.use(cors());

app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { url, options } = req.body;

  const username = process.env.SCRAPING_BOT_USERNAME;
  const apiKey = process.env.SCRAPING_BOT_API_KEY;

  if (!username || !apiKey) {
    return res.status(400).json({ error: 'Missing API credentials' });
  }

  const auth = Buffer.from(`${username}:${apiKey}`).toString('base64');

  try {
    const response = await fetch('http://api.scraping-bot.io/scrape/retail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        options,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error: unknown) {
    // Type assertion
    const err = error as Error;
    res.status(500).json({ error: 'Scraping error', details: err.message });
  }  
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
