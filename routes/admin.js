const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Request = require('../models/Request');
const auth = require('../middleware/auth');

const router = express.Router();
router.use(express.static("public"))
const PAGE_SIZE = 6;

// Login page
router.get('/', (req, res) => {
  res.render('admin-login');
});

// Login
router.post('/login', async (req, res) => {
  const admin = await Admin.findOne({ username: req.body.username });
  if (!admin) return res.send('<h1>Access denied</h1>');

  const ok = await bcrypt.compare(req.body.password, admin.password);
  if (!ok) return res.send('<h1>Access denied</h1>');

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/adesmine/dashboard');
});

// Dashboard
router.get('/dashboard', auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  const total = await Request.countDocuments();
  const requests = await Request.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);

  res.render('admin-dashboard', {
    requests,
    currentPage: page,
    totalPages: Math.ceil(total / PAGE_SIZE)
  });
});

// Mark completed
router.post('/complete/:id', auth, async (req, res) => {
  await Request.findByIdAndUpdate(req.params.id, {
    status: 'completed'
  });
  res.redirect('/adesmine/dashboard');
});

// Delete
router.post('/delete/:id', auth, async (req, res) => {
  await Request.findByIdAndDelete(req.params.id);
  res.redirect('/adesmine/dashboard');
});

// Logout
router.get('/logout', auth, (req, res) => {
  res.clearCookie('token');
  res.redirect('/adesmine');
});

module.exports = router;
