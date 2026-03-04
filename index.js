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
          "คิดถึงเหมือนกานนนน 💕",
          "ไม่ว่างตอบ พุ่งหลังอยู่ 🫠 แต่่เค้าคิดถึงเทอทุกวินาทีเลยแหละ ิิ ",
          "เค้าก้ออคิดถึงงง เด่วเค้าจะรีบกลับไปหาา รออีกแปปนึงนะ🥺 ",
          "เค้าคิดถึงเทอมากกว่าอีก มากกว่าล้านๆๆๆๆ เท่าเลยย💯 ",
          "คิดถึงแฟนนะคะ",
          "คิดถึงจิงมั้ย จิงอะป่าว จิงมั้ยน้าาาา เชื่อก้อด้าย ",
          "คิดถึงจนอยากทะลุจอไปกอดเลยนะ 🥺",
          "คิดถึงที่รักที่สุดเหมือนกัน ",
          "ที่ร้าาก คิดถึง คิดถึง คิดถึง ",
          "คิดถึงเออนซ์จังงงง "
        ];
      }

      // 🔥 ฝันดี
      else if (/ฝันดี+|(หลับม่ายฝัน)|(หลับไม่ฝัน)|(ง่วง)/.test(userText)) {
        replyList = [
          "หลับม่ายฝันน้าาา 🌙",
          "พักผ่อนหน่อยมั้ยย นอนอนอนอนอน",
          "อยากไปนอนข้างๆให้เทอหายเหนื่อย",
          "ให้ไปนอนกอดมั้ย อยากวาร์ปปออกไปหาเทอ "
          "โอ๋ๆๆ พักผ่อนด้ายแล้ว พักให้หายเหนื่อย "
        ];
      }

      // 🔥 กินอะไร
      else if (/(รัก)|(ร้าก)|(รักนะ)|(ร้าากก)|(รุก)/.test(userText)) {
        replyList = [
          "รักนะคะที่ร้าก",
          "เค้าก้อรักเทอ รักที่สุด ที่สุ้้ดดดด",
          "รักมากกกกก รักทุ้กกวันนน รักตลอดเวลาา",
          "เค้ารักเทอมากกว่าอีกก ิิ ",
          "รักตลอดเลยนะ ",
          "รักจิงม้ายยยย รักเท่าเค้าอะป่าววว",
          "รักแฟนครับ ไม่อยากให้ใครมายุ่ง หวง ",
          "เค้าก้อรัก เพราะฉะนั้นต้องดูแลตัวเองด้วยนะ ถ้าเปนอะรายมาเค้าโกดแน่น่น่น !!",
          "1 2 3 4 5 เค้าเลิฟเทอ "
          "รักนะค่ะเจ้าออนซ์ "
          "รัก รัก รัก รัก รัก  "
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
