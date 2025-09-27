require('dotenv').config(); // load .env variables
const express = require('express');
const twilio = require('twilio');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

app.get('/', (req, res) => {
  res.render('homepage');
});

app.post('/homepage', async (req, res) => {
  try {
    // Convert req.body to a clean string
    const messageBody = Object.entries(req.body)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    // Send WhatsApp message
    await client.messages.create({
      body: `🚨 New request received:\n${messageBody}`,
      from: 'whatsapp:+14155238886', // Twilio sandbox number
      to: 'whatsapp:+2347078226362', // your verified WhatsApp number
    });

    res.render('homepage'); // re-render homepage
  } catch (err) {
    console.error('Error sending WhatsApp:', err.message);
    res.status(500).send('Failed to send WhatsApp notification');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
