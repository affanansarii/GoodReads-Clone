import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config.js';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import myBookRoutes from './routes/myBookRoutes.js';

const app = express();

app.use(cookieParser());

const allowedOrigins = [
    "https://good-reads-clone-asmxw1mc3-affan-ansaris-projects-52c0ab0f.vercel.app",
    "http://localhost:3000"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());

app.get('/', (_req, res) => res.send('My Library API OK'));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/mybooks', myBookRoutes);

const start = async () => {
    await connectDB();
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`API on http://localhost:${port}`));
};
start();
