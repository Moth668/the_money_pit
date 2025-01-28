import express { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { loginRouther } from './routes/index.js';
import { protectedRouter } from './routes/protected';
import db from './config/connection.js';

await db();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
