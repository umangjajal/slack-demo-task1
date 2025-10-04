import slackClient from "../slackClient.js";
import dotenv from "dotenv";
dotenv.config();

const channel = process.env.SLACK_CHANNEL_ID;

// ✅ Send Message
export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const result = await slackClient.chat.postMessage({
      channel,
      text,
    });
    res.json({ success: true, message: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Schedule Message
export const scheduleMessage = async (req, res) => {
  try {
    const { text, post_at } = req.body; // post_at = UNIX timestamp
    const result = await slackClient.chat.scheduleMessage({
      channel,
      text,
      post_at,
    });
    res.json({ success: true, message: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Retrieve Messages
export const getMessages = async (req, res) => {
  try {
    const result = await slackClient.conversations.history({ channel, limit: 5 });
    res.json({ success: true, messages: result.messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Edit Message
export const editMessage = async (req, res) => {
  try {
    const { ts, new_text } = req.body;
    const result = await slackClient.chat.update({
      channel,
      ts,
      text: new_text,
    });
    res.json({ success: true, message: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Message
export const deleteMessage = async (req, res) => {
  try {
    const { ts } = req.body;
    const result = await slackClient.chat.delete({
      channel,
      ts,
    });
    res.json({ success: true, message: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
