import User from "../models/User.js"; // Mongoose model
import { GraphQLError } from "graphql";
import type IUserDocument from '../interfaces/UserDocument';
import { signToken } from '../services/auth-service.js';
import { AuthenticationError } from 'apollo-server-express';

export const resolvers = {
  Query: {
    async user(_: any, args: { userId?: string }) {
      // Use args.userId instead of args.id
      if (!args.userId) {
        // Optionally, return a default user or throw an error
        return await User.findOne({ _id: "000000000000000000000001" });
      }
      return await User.findById(args.userId);
    },

    async users() {
      return await User.find();
    },
  },

  Mutation: {
    async addIncome(_: any, { id, month, income }: { id: string; month: string; income: number }) {
      const user = await User.findById(id);
      if (!user) throw new GraphQLError("User not found");
      user.monthlyIncome.push({ month, income });
      await user.save();
      return user;
    },

    async addExpense(_: any, { id, month, expense }: { id: string; month: string; expense: number }) {
      const user = await User.findById(id);
      if (!user) throw new GraphQLError("User not found");
      user.monthlyExpenses.push({ month, expense });
      await user.save();
      return user;
    },

    async addSavings(_: any, { id, month, savings }: { id: string; month: string; savings: number }) {
      const user = await User.findById(id);
      if (!user) throw new GraphQLError("User not found");
      user.currentSavings.push({ month, savings });
      await user.save();
      return user;
    },

    async addInvestment(_: any, { id, month, investment }: { id: string; month: string; investment: number }) {
      const user = await User.findById(id);
      if (!user) throw new GraphQLError("User not found");
      user.currentInvestments.push({ month, investment });
      await user.save();
      return user;
    },

    async deleteIncome(_: any, { id, month }: { id: string; month: string }) {
      const user = await User.findById(id);
      if (!user) throw new GraphQLError("User not found");
      user.monthlyIncome = user.monthlyIncome.filter((income) => income.month !== month);
      await user.save();
      return user;
    },

    async deleteExpense(_: any, { id, month }: { id: string; month: string }) {
      const user = await User.findById(id);
      if (!user) throw new GraphQLError("User not found");
      user.monthlyExpenses = user.monthlyExpenses.filter((expense) => expense.month !== month);
      await user.save();
      return user;
    },

    async deleteSavings(_: any, { id, month }: { id: string; month: string }) {
      const user = await User.findById(id);
      if (!user) throw new GraphQLError("User not found");
      user.currentSavings = user.currentSavings.filter((saving) => saving.month !== month);
      await user.save();
      return user;
    },

    async deleteInvestment(_: any, { id, month }: { id: string; month: string }) {
      const user = await User.findById(id);
      if (!user) throw new GraphQLError("User not found");
      user.currentInvestments = user.currentInvestments.filter((investment) => investment.month !== month);
      await user.save();
      return user;
    },
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
        console.log("Invalid Password")
        throw new AuthenticationError('Invalid credentials: password incorrect');
      }

      const token = signToken(user.username, user.email, user._id);

      console.log("Token from signToken:", token);

      return { token, user };
    },
  },
};

export default resolvers;
