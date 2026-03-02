const express = require('express');
const line = require('@line/bot-sdk');

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(config);

// 🔥 สร้างคลังคำตอบหลายชุด
const replyMessages = {
  "คิดถึง": [
    "คิดถึงเหมือนกันนะ 💕",
    "คิดถึงที่สุดเลย 🥺",
    "ก็คิดถึงทุกวันแหละ 💗"
  ],
  "ฝันดี": [
    "ฝันดีนะคนเก่ง 🌙",
    "นอนหลับฝันหวานนะ 😴",
    "คืนนี้ขอให้ฝันถึงเรานะ 💫"
  ],
  "กินไร": [
    "กินเธอได้ปะ 😳",
    "กินข้าวยังงง 🍚",
    "อย่าลืมกินข้าวนะ เดี๋ยวผอม 💕"
  ],
  "สวัสดี": [
    "สวัสดีค้าบบบ 😆",
    "ดีจ้าาา 💕",
    "ไงงงงง 😎"
  ]
};

app.post('/webhook', line.middleware(config), async (req, res) => {
  try {
    const event = req.body.events[0];

    if (event.type === 'message' && event.message.type === 'text') {

      const userText = event.message.text.trim();

      // เช็คว่าคำที่พิมพ์มีในคลังไหม
      if (replyMessages[userText]) {

        const randomReply =
          replyMessages[userText][
            Math.floor(Math.random() * replyMessages[userText].length)
          ];

        await client.replyMessage(event.replyToken, {
          type: 'text',
          text: randomReply
        });
      }
    }

    res.sendStatus(200);

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// กันเว็บว่าง
app.get('/', (req, res) => {
  res.send("Bot is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
