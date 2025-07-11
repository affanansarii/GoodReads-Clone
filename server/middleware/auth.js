const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: 'Unauthorized' });
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch {
        res.status(401).json({ msg: 'Invalid token' });
    }
};
