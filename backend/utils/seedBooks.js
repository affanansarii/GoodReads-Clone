import 'dotenv/config.js';
import { connectDB } from '../config/db.js';
import Book from '../models/Book.js';

const sample = {
    books: [
        {
            title: "The Pragmatic Programmer",
            author: "Andrew Hunt & David Thomas",
            coverImage: "https://placehold.co/300x300/FF5733/FFFFFF?text=The+Pragmatic+Programmer",
            availability: true
        },
        {
            title: "Clean Code",
            author: "Robert C. Martin",
            coverImage: "https://placehold.co/300x300/3498DB/FFFFFF?text=Clean+Code",
            availability: true
        }
    ]
};

(async () => {
    await connectDB();
    await Book.deleteMany({});
    await Book.insertMany(sample.books);
    console.log('Seeded books');
    process.exit(0);
})();
