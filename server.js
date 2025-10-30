require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 🧠 Debug: print all environment variables
console.log("==== ENV CHECK START ====");
console.log("SHOPIFY_STORE raw:", JSON.stringify(process.env.SHOPIFY_STORE));
console.log("ACCESS_TOKEN raw:", JSON.stringify(process.env.ACCESS_TOKEN));
console.log("PORT raw:", JSON.stringify(process.env.PORT));
console.log("All ENV keys:", Object.keys(process.env));
console.log("==== ENV CHECK END ====");

// ✅ Root endpoint to confirm the server is alive
app.get("/", (req, res) => {
  res.send("🟢 one0won-agent is running!");
});

// 🧠 Safe /test endpoint with full error handling
app.get("/test", async (req, res) => {
  try {
    const { SHOPIFY_STORE, ACCESS_TOKEN } = process.env;

    if (!SHOPIFY_STORE || !ACCESS_TOKEN) {
      throw new Error("Missing SHOPIFY_STORE or ACCESS_TOKEN environment variable.");
    }

    const response = await axios.get(
      `https://${SHOPIFY_STORE}/admin/api/2024-10/shop.json`,
      {
        headers: {
          "X-Shopify-Access-Token": ACCESS_TOKEN,
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
  } catch (error) {
    console.error("🔥 /test endpoint failed:", error.message);
    res.status(500).json({
      status: "❌ Error",
      message: error.message || "Unexpected error occurred",
      tip: "Check your environment variables or API permissions."
    });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
