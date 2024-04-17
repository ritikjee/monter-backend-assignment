import mongoose from "mongoose";

type optSchemaType = {
  email: string;
  otp: string;
};

const otpSchema = new mongoose.Schema<optSchemaType>(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
