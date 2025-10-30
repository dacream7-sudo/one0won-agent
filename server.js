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
