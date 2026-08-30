const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";
import axios from "axios";

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

