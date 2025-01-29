import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    email: string;
    password: string;

}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    // set this to use virtual below
    {
        toJSON: {
            virtuals: true,
        },
    }
});

// hash user password
userSchema.pre<IUser>('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
