const Book = require('./models/Book');
const sample = require('./books.json').books;

module.exports = async () => {
    for (let b of sample) {
        const exists = await Book.findOne({ title: b.title });
        if (!exists) await Book.create(b);
    }
};
