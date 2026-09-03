import { api } from "./axios";

export async function LoginApi(email: string, password: string) {
    try {
        const response = await api.post(`/api/users/login`, { email, password });
        return response.data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

export async function RegisterApi(name: string, email: string, password: string) {
    try {
        const response = await api.post(`/api/users/register`, { name, email, password });
        return response.data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
