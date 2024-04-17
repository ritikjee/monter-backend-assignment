import nodemailer from "nodemailer";

export async function sendMail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "Hello from Monter",
    text: "This is your OTP: " + otp,
  };

  await transporter.sendMail(mailOptions);
  return true;
}
