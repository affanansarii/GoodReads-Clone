import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const setAuthCookie = (res, payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.COOKIE_SECURE === 'true',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email & password required' });
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: 'Email already registered' });
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashed });
        setAuthCookie(res, { id: user._id, email: user.email });
        res.status(201).json({ email: user.email });
    } catch (e) {
        res.status(500).json({ message: 'Registration failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });
        setAuthCookie(res, { id: user._id, email: user.email });
        res.json({ email: user.email });
    } catch {
        res.status(500).json({ message: 'Login failed' });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'strict', secure: process.env.COOKIE_SECURE === 'true' });
    res.json({ message: 'Logged out' });
});

router.get('/me', (req, res) => {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ message: 'Not authenticated' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ email: decoded.email });
    } catch {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

export default router;
