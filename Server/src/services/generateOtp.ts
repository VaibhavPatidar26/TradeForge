
export default function generateOtp() {
    const otp = String(
        Math.floor(Math.random() * 1000000)
    ).padStart(6, "0");

    return otp;
}