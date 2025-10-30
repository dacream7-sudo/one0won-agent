require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;console.log("==== ENV CHECK START ====");
console.log("SHOPIFY_STORE raw:", JSON.stringify(process.env.SHOPIFY_STORE));
console.log("ACCESS_TOKEN raw:", JSON.stringify(process.env.ACCESS_TOKEN));
console.log("PORT raw:", JSON.stringify(process.env.PORT));
console.log("All ENV keys:", Object.keys(process.env));
console.log("==== ENV CHECK END ====");

console.log("==== ENV CHECK START ====");
console.log("SHOPIFY_STORE raw:", JSON.stringify(process.env.SHOPIFY_STORE));
console.log("ACCESS_TOKEN raw:", JSON.stringify(process.env.ACCESS_TOKEN));
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

    const response = awai
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

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

    const response = awai
