import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import { loginRouther } from './routes/index.js';
// import { protectedRouter } from './routes/protected';
import db from './config/connection.js';

// Configure environment variables
dotenv.config();  // Load environment variables from .env file

//Initialize express
const app = express();  // Create an express application?

//Enviorment variables
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGODB_URI;  // Get the MongoDB URI from the environment variables
//ask Owen about line 16

//middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//connect to your custom db here
await db();

//connect to mongodb
mongoose
  .connect(MONGO_URI, { useNewURLParse: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


//routes
app.use(routes);
app.use('login', loginRouter);
app.use(protectedRouter);

//start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
