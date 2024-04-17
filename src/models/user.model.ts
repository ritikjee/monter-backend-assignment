import mongoose from "mongoose";

type userSchemaType = {
  email: string;
  password: string;
  __verified?: boolean;
  location?: string;
  age?: number;
  work?: string;
};

const userSchema = new mongoose.Schema<userSchemaType>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    __verified: { type: Boolean, default: false },
    location: { type: String },
    age: { type: Number },
    work: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
