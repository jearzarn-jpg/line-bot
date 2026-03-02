const express = require('express');
const line = require('@line/bot-sdk');

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), async (req, res) => {
  const events = req.body.events;

  for (let event of events) {

    if (event.type === 'message' && event.message.type === 'text') {

      const userText = event.message.text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "");

      let replyList = null;

      // 🔥 คิดถึง (จับได้หลายแบบ)
      const missYouRegex = /(คถ)|(คิดถึง+)|(คิดถุง)|(คิดทึง)/;

      if (missYouRegex.test(userText)) {
        replyList = [
          "คิดถึงเหมือนกันนะ 💕",
          "ก็คิดถึงทุกวันแหละ 🥺",
          "คิดถึงที่สุดเลยย 💗",
          "ไม่ต้องบอกก็รู้ว่าคิดถึง 😏"
        ];
      }

      // 🔥 ฝันดี
      else if (/ฝันดี+/.test(userText)) {
        replyList = [
          "ฝันดีนะคนเก่ง 🌙",
          "คืนนี้ฝันถึงเราด้วยนะ 😴",
          "นอนหลับฝันหวานนะ 💫"
        ];
      }

      // 🔥 กินอะไร
      else if (/(กินไร)|(กินอะไร)|(กินยาง)|(กินยัง)/.test(userText)) {
        replyList = [
          "กินเธอได้ปะ 😳",
          "กินข้าวยังงง 🍚",
          "อย่าลืมกินข้าวนะ 💕"
        ];
      }

      // 🔥 ถ้าไม่ตรงอะไรเลย
      else {
        replyList = [
          "ว่าไงงง 😝",
          "พิมพ์อะไรน้าา",
          "พูดอีกทีได้ไหม 🥺"
        ];
      }

      const randomReply =
        replyList[Math.floor(Math.random() * replyList.length)];

      await client.replyMessage(event.replyToken, {
        type: 'text',
        text: randomReply
      });
    }
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
