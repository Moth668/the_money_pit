import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// Define sub-schemas for financial elements
const IncomeSchema = new Schema({
    month: { type: String, required: true },
    income: { type: Number, required: true },
});

const ExpenseSchema = new Schema({
    month: { type: String, required: true },
    category: { type: String, required: true },
    expense: { type: Number, required: true },
});

const SavingsSchema = new Schema({
    month: { type: String, required: true },
    savings: { type: Number, required: true },
});

const InvestmentSchema = new Schema({
    month: { type: String, required: true },
    investment: { type: Number, required: true },
});

// Define the IUser interface for TypeScript
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    monthlyIncome: { month: string; income: number }[];
    monthlyExpenses: { month: string; expense: number }[];
    currentSavings: { month: string; savings: number }[];
    currentInvestments: { month: string; investment: number }[];
    isCorrectPassword(password: string): Promise<boolean>;
}

// Define User Schema
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        monthlyIncome: {
            type: [IncomeSchema],
            default: [],
        },
        monthlyExpenses: {
            type: [ExpenseSchema],
            default: [],
        },
        currentSavings: {
            type: [SavingsSchema],
            default: [],
        },
        currentInvestments: {
            type: [InvestmentSchema],
            default: [],
        },
    },
    {
        toJSON: { virtuals: true },
    }
);

// Hash user password before saving
userSchema.pre<IUser>("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// Compare and validate password
userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

// Create the Mongoose model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
