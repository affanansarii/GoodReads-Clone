require('dotenv').config();
const express = require('express'), mongoose = require('mongoose');
const cookieParser = require('cookie-parser'), cors = require('cors');

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const myBookRoutes = require('./routes/mybooks');
const seedBooks = require('./seedBooks.js');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        seedBooks(); // seed initial books
    })
    .catch(console.error);

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/mybooks', myBookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
