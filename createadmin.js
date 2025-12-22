require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');

(async () => {
  try {
    // CONNECT TO MONGODB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // HASH PASSWORD
    const hash = await bcrypt.hash('241000gG#', 10);

    // CREATE ADMIN
    await Admin.create({
      username: 'iyiola',
      password: hash
    });

    console.log('Admin created successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
