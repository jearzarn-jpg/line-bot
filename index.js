const express = require('express');
const line = require('@line/bot-sdk');

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(config);

const replies = [
  "คิดถึงเหมือนกันนะ 💕",
  "มากอดหน่อยเร็ว 🥺",
  "คิดถึงที่สุดเลย 😆",
  "ก็คิดถึงทุกวันแหละ 💖"
];

app.post('/webhook', line.middleware(config), async (req, res) => {
  try {
    const event = req.body.events[0];

    if (
  event.type === 'message' &&
  event.message.type === 'text' &&
  event.message.text === "คิดถึง"
) {
  const randomReply = replies[Math.floor(Math.random() * replies.length)];

  await client.replyMessage(event.replyToken, {
    type: 'text',
    text: randomReply
  });
}

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
app.get("/", (req, res) => {
  res.send("Bot is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
