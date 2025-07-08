const express = require('express'), auth = require('../middleware/auth');
const MyBook = require('../models/MyBook');
const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
    const m = await MyBook.find({ userId: req.user.id }).populate('bookId');
    res.json(m);
});

router.post('/:bookId', async (req, res) => {
    const exists = await MyBook.findOne({ userId: req.user.id, bookId: req.params.bookId });
    if (exists) return res.status(400).json({ msg: 'Already added' });
    const mb = await MyBook.create({ userId: req.user.id, bookId: req.params.bookId });
    res.json(await mb.populate('bookId'));
});

router.patch('/:bookId/status', async (req, res) => {
    const { status } = req.body;
    const mb = await MyBook.findOneAndUpdate(
        { userId: req.user.id, bookId: req.params.bookId },
        { status },
        { new: true }
    ).populate('bookId');
    res.json(mb);
});

router.patch('/:bookId/rating', async (req, res) => {
    const { rating } = req.body;
    const mb = await MyBook.findOneAndUpdate(
        { userId: req.user.id, bookId: req.params.bookId },
        { rating },
        { new: true }
    ).populate('bookId');
    res.json(mb);
});

module.exports = router;
