require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/adesmine', require('./routes/admin'));

app.get('/', (req, res) => {
  res.render('homepage');
});

const Request = require('./models/Request');

app.post('/homepage', async (req, res) => {
  try {
    await Request.create({ data: req.body });
    res.render('homepage');
  } catch (err) {
    res.status(500).send('Failed to save request');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
