import { AuthenticationError } from 'apollo-server-express';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
import User from '../models/User.js';
// import { JWT_SECRET } from '../config';
import type  IUserContext  from '../interfaces/UserContext';
import type  IUserDocument  from '../interfaces/UserDocument';
import dotenv from 'dotenv';    
import { signToken } from '../services/auth-service.js';
dotenv.config();
    

// const signToken = (user: IUserDocument): string => {
//     const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
//     return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
// };

const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: IUserContext): Promise<IUserDocument | null> => {
            if (context.user) {
                return await User.findById(context.user._id).select('-__v -password');
            }
            throw new AuthenticationError('User not authenticated');
        },
    },
    Mutation: {
        addUser: async (_parent: any, { username, email, password }: { username: string; email: string; password: string }): Promise<{ token: string; user: IUserDocument }> => {
            // const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password });
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        login: async (_parent: any, { login, password }: { login: string; password: string }): Promise<{ token: string; user: IUserDocument }> => {
            const lookupField = login.includes('@') ? 'email' : 'username';  
            const user = await User.findOne({ [lookupField]: login });
            
            console.log("USER", user);
            if (!user) {
                throw new AuthenticationError('Invalid credentials: user not found');
            }

            const validPassword = await user.isCorrectPassword(password);
            if (!validPassword) {
                throw new AuthenticationError('Invalid credentials: password incorrect');
            }

            // if (!user || !(await user.isCorrectPassword(password))) {
            //     throw new AuthenticationError('Invalid credentials');
            // }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

    },
};

export default resolvers;