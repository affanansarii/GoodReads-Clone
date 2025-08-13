import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// Public: GET /api/books
router.get('/', async (_req, res) => {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
});

export default router;
