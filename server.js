require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🟢 one0won-agent is running!");
});

app.get("/test", async (req, res) => {
  try {
    const response = await axios.get(
      `https://${process.env.SHOPIFY_STORE}/admin/api/2024-10/shop.json`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.ACCESS_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      status: "✅ Connected",
      shop: response.data.shop.name,
      domain: response.data.shop.myshopify_domain,
      country: response.data.shop.country_name
    });
  } catch (err) {
    console.error("❌ Shopify connection failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
