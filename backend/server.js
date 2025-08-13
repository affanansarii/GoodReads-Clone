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

const allowedOrigins = [
    "https://good-reads-clone-n26rzsacl-affan-ansaris-projects-52c0ab0f.vercel.app", // your frontend
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // important for cookies/JWT
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
