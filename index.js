const express = require('express');
const line = require('@line/bot-sdk');

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(config);

// คำตอบสุ่ม
const replies = [
  "คิดถึงเหมือนกันนะ 💕",
  "มากอดหน่อยเร็ว 🤗",
  "คิดถึงที่สุดเลย 😊",
  "คิดถึงทุกวันเลยนะ 💖"
];

// webhook
app.post('/webhook', line.middleware(config), async (req, res) => {
  try {

    // กันกรณีไม่มี event
    if (!req.body.events || req.body.events.length === 0) {
      return res.sendStatus(200);
    }

    const event = req.body.events[0];

    // เช็คว่าเป็นข้อความ text
    if (event.type === 'message' && event.message.type === 'text') {

      const userText = event.message.text;

      // ถ้าพิมพ์ว่า "คิดถึง"
      if (userText === 'คิดถึง') {

        const randomReply =
          replies[Math.floor(Math.random() * replies.length)];

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

// หน้าเว็บเช็คว่า bot รันอยู่
app.get('/', (req, res) => {
  res.send('Bot is running');
});

// ใช้ PORT ของ Render อัตโนมัติ
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
