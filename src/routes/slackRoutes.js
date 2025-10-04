import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const SLACK_API = "https://slack.com/api";
const token = process.env.SLACK_BOT_TOKEN;
const channel = process.env.CHANNEL_ID;

// ✅ Send message
router.post("/send", async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(
      `${SLACK_API}/chat.postMessage`,
      { channel, text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Retrieve messages
router.get("/messages", async (req, res) => {
  try {
    const response = await axios.get(
      `${SLACK_API}/conversations.history?channel=${channel}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Edit message
router.put("/edit", async (req, res) => {
  try {
    const { ts, new_text } = req.body;
    const response = await axios.post(
      `${SLACK_API}/chat.update`,
      { channel, ts, text: new_text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete message
router.delete("/delete", async (req, res) => {
  try {
    const { ts } = req.body;
    const response = await axios.post(
      `${SLACK_API}/chat.delete`,
      { channel, ts },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
