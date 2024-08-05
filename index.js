// server/index.js
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes
const PORT = process.env.PORT || 5000;

app.get('/api/news', async (req, res) => {
  const cachedData = cache.get('news');
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        apiKey: '76b854be2385428ab0e99cd645d82244',
        pageSize: 5,
      },
    });

    cache.set('news', response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
