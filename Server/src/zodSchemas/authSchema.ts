import * as z from "zod";

export const registerScema = z.object({
    name: z.string().min(5),

    email: z.email(),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
            /[^A-Za-z0-9]/,
            "Password must contain at least one special character"
        )
});

export const otpSchema = z.object({
    otp: z.string().length(6, "OTP must be of 6 digits").regex(/[0-9]{6}/)
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
})

