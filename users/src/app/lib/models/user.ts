import mongoose, { Model, Schema } from "mongoose";
import IUser from "@/app/types/user";

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: function () { return !this.isGoogleUser; }, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: function () { return !this.isGoogleUser; }, },
    isGoogleUser: Boolean,
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;