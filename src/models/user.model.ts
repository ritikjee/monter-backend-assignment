import mongoose from "mongoose";

type userSchemaType = {
  email: string;
  password: string;
  __verified?: boolean;
};

const userSchema = new mongoose.Schema<userSchemaType>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    __verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
