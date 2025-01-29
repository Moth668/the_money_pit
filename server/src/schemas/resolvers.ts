import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { JWT_SECRET } from '../config';
import type { IUserContext } from '../interfaces/UserContext';
import type { IUserDocument } from '../interfaces/UserDocument';

const signToken = (user: IUserDocument): string => {
    return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: IUserContext): Promise<IUserDocument | null> => {
            if (context.user) {
                return await User.findById(context.user.id).select('-__v -password');
            }
            throw new AuthenticationError('User not authenticated');
        },
    },
    Mutation: {
        addUser: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: IUserDocument }> => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ email, password: hashedPassword });
            const token = signToken(user);
            return { token, user };
        },
        login: async (_parent: any, { login, password }: { login: string; password: string }): Promise<{ token: string; user: IUserDocument }> => {
            const lookupField = login.includes('@') ? 'email' : 'username';  
            const user = await User.findOne({ [lookupField]: login });
            
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new AuthenticationError('Invalid credentials');
            }
            const token = signToken(user);
            return { token, user };
        },

    },
};

export default resolvers;