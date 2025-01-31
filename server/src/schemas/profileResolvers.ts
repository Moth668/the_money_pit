import Profile from "../models/Profile";

export const profileResolvers = {
  Query: {
    getProfile: async (_: any, __: any, context: { user: { id: string } }) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      const profile = await Profile.findOne({ userId: context.user.id });
      return profile;
    },
    isLoggedIn: (_: any, __: any, context: { user: { id: string } }) => {
      return !!context.user;
    },
  },
  Mutation: {
    saveProfile: async (
      _: any,
      { name, email, picture, address, cards, username }: any,
      context: { user: { id: string } }
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      const updatedProfile = await Profile.findOneAndUpdate(
        { userId: context.user.id },
        { name, email, picture, address, cards, username },
        { new: true, upsert: true }
      );
      return updatedProfile;
    },
    logOut: async (_: any, __: any, context: { session: any }) => {
      if (context.session) {
        context.session.destroy();
      }
      return true;
    },
  },
};
