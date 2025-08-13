import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ message: 'Not authenticated' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, email: decoded.email };
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Invalid/expired token' });
    }
};
