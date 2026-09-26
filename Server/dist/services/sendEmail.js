import nodemailer from "nodemailer";
export default async function sendEmail(email, backendOtp) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "TradeForge OTP Verification",
            text: `Your TradeForge OTP is ${backendOtp}. It will expire in 5 minutes.`
        });
    }
    catch (err) {
        console.error("Nodemailer failed to send email:", err.message || err);
    }
}
//# sourceMappingURL=sendEmail.js.map