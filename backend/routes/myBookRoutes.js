import express from 'express';
import MyBook from '../models/MyBook.js';
import Book from '../models/Book.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// GET /api/mybooks
router.get('/', async (req, res) => {
    const items = await MyBook.find({ userId: req.user.id }).populate('bookId');
    const result = items.map(x => ({
        _id: x._id,
        book: x.bookId,
        status: x.status,
        rating: x.rating
    }));
    res.json(result);
});

// POST /api/mybooks/:bookId
router.post('/:bookId', async (req, res) => {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    try {
        const created = await MyBook.create({ userId: req.user.id, bookId, status: 'Want to Read' });
        res.status(201).json({ id: created._id });
    } catch (e) {
        if (e.code === 11000) return res.status(200).json({ message: 'Already in My Books' });
        res.status(500).json({ message: 'Failed to add' });
    }
});

// PATCH /api/mybooks/:bookId/status
router.patch('/:bookId/status', async (req, res) => {
    const { bookId } = req.params;
    const { status } = req.body;
    if (!['Want to Read', 'Currently Reading', 'Read'].includes(status))
        return res.status(400).json({ message: 'Invalid status' });

    const item = await MyBook.findOneAndUpdate(
        { userId: req.user.id, bookId },
        { $set: { status } },
        { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ status: item.status });
});

// PATCH /api/mybooks/:bookId/rating
router.patch('/:bookId/rating', async (req, res) => {
    const { bookId } = req.params;
    const { rating } = req.body;
    if (typeof rating !== 'number' || rating < 1 || rating > 5)
        return res.status(400).json({ message: 'Rating must be 1-5' });

    const item = await MyBook.findOneAndUpdate(
        { userId: req.user.id, bookId },
        { $set: { rating } },
        { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ rating: item.rating });
});

export default router;
