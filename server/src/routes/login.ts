import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

//need help with JWT Secret have to set it up
const loginRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

loginRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});

export { loginRouter };