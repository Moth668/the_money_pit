import type { Request } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
    _id: unknown;
    username: string;
    email: string,
}

export const authenticateToken = ({ req } : { req: Request }) => {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }
    
    if (!token) {
        return req;
    }
    
    try {
        const { data }: any = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
        req.user = data as JwtPayload;
    } catch (err) {
        console.log('Invalid token');
    }
    
    return req;
};