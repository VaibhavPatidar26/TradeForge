import axios from "axios";

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";

export async function LoginApi(email: string, password: string) {
    try {
        const response = await axios.post(`${BackendURL}api/users/login`, { email, password });
        return response.data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

export async function RegisterApi(name: string, email: string, password: string) {
    try {
        const response = await axios.post(`${BackendURL}api/users/register`, { name, email, password });
        return response.data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

export async function VerifyOtpApi(email: string, userOtp: string) {
    try {
        const response = await axios.post(`${BackendURL}api/users/verify-otp`, { email, userOtp });
        return response.data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

export async function ResendOtpApi(email: string) {
    try {
        const response = await axios.post(`${BackendURL}api/users/resend-otp`, { email });
        return response.data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

