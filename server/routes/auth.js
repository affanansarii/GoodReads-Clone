const express = require('express'), bcrypt = require('bcryptjs'), jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'Email exists' });
    const hashed = await bcrypt.hash(password, 10);
    const u = await User.create({ email, password: hashed });
    const token = jwt.sign({ id: u._id, email: u.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.json({ email: u.email, id: u._id });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u || !(await bcrypt.compare(password, u.password)))
        return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: u._id, email: u.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.json({ email: u.email, id: u._id });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
    res.json({ msg: 'Logged out' });
});

router.get('/me', auth, (req, res) => {
    res.json({ email: req.user.email, id: req.user.id });
});

module.exports = router;
