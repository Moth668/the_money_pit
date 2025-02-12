import mongoose from 'mongoose';

const db = async (): Promise<typeof mongoose.connection> => {
    try {
        const database = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/moneyPitDB'
        await mongoose.connect(database);
        console.log('Database connected. ', database);
        return mongoose.connection;
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Database connection failed.');
    }
}

export default db;
