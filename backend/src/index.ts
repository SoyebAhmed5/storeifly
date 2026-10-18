import "dotenv/config";
import express from "express";
import cors from "cors";

import { clerkMiddleware } from "@clerk/express";
import { clerkWebhookHandler } from "./webhooks/clerk.js";
import { loadEnv } from "./lib/env.js";


const env = loadEnv();
const app = express();

const rawJson = express.json({type: "application/json", "limit": "1mb"});

app.post("/webhooks/clerk", rawJson ,(req, res) => {
    void clerkWebhookHandler(req, res);
});

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.post("/webhooks/clerk", (req, res) => {
    void clerkWebhookHandler(req, res);
});

app.listen(env.PORT,()=>console.log("Listening on Port " + env.PORT));

