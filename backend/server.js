import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config.js';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import myBookRoutes from './routes/myBookRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowed = process.env.CLIENT_URL?.split(',') || ['http://localhost:5173'];
app.use(cors({
    origin: allowed,
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("GoodReads Clone Backend is running 🚀");
});


app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/mybooks', myBookRoutes);

const start = async () => {
    await connectDB();
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`API on http://localhost:${port}`));
};
start();
