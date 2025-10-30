require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// ✅ Handle both upper- and lowercase env vars (Render sometimes lowercases them)
const PORT =
  process.env.PORT ||
  process.env.port ||
  3000;

const SHOPIFY_STORE =
  process.env.SHOPIFY_STORE ||
  process.env.shopify_store ||
  '';

const ACCESS_TOKEN =
  process.env.ACCESS_TOKEN ||
  process.env.access_token ||
  '';

// 🧠 Print what the app actually sees
console.log('==== ENV CHECK START ====');
console.log('SHOPIFY_STORE:', JSON.stringify(SHOPIFY_STORE));
console.log('ACCESS_TOKEN:', JSON.stringify(ACCESS_TOKEN));
console.log('PORT:', JSON.stringify(PORT));
console.log('All ENV keys:', Object.keys(process.env));
console.log('==== ENV CHECK END ====');

// ✅ Basic root route
app.get('/', (req, res) => {
  res.send('🟢 one0won-agent is live and running!');
});

// 🧠 Shopify connection test route
app.get('/test', async (req, res) => {
  try {
    if (!SHOPIFY_STORE || !ACCESS_TOKEN) {
      throw new Error(
        'Missing SHOPIFY_STORE or ACCESS_TOKEN environment variable.'
      );
    }

    const url = `https://${SHOPIFY_STORE}/admin/api/2024-10/shop.json`;
    const response = await axios.get(url, {
      headers: {
        'X-Shopify-Access-Token': ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    });

    res.json({
      status: '✅ Connected',
      shop: response.data.shop.name,
      domain: response.data.shop.myshopify_domain,
      country: response.data.shop.country_name,
    });
  } catch (error) {
    console.error('🔥 /test failed:', error.message);
    res.status(500).json({
      status: '❌ Error',
      message: error.message || 'Unexpected error occurred',
      tip: 'Check your environment variables or API permissions.',
    });
  }
});

// ✅ Keep server running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
