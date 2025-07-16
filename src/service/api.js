// getData.js
import axios from 'axios';

export default async function get() {
    try {
        const response = await axios.get("http://localhost:8080/api");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch:", error.message);
        throw error;
    }
}


export async function getSingle({id}) {
    try {
        const res = await axios.get(`http://localhost:8080/api/${id}`);
        return res.data;
    } catch (error) {
        console.error("Failed to fetch:", error.message);
        throw error;
    }
}

    export async function generateToken({ questionId }) {
        const jwt = localStorage.getItem("token");
        const body = {
            questionId,
            jwt
        };

        try {
            const res = await axios.post(`http://localhost:8080/api/generate`, body);
            return res.data;
        } catch (error) {
            console.error('Failed to generate token:', error);
            throw error; // so the caller knows this failed
        }
}


export async function register({ email, password }) {
    try {
        const res = await axios.post(`http://localhost:8080/auth/register`, { email, password });
        return res.data;
    } catch (error) {
        console.error("Failed to register:", error.message);
        throw error;
    }
}

export async function login({ email, password }) {
    try {
        const res = await axios.post(`http://localhost:8080/auth/login`, { email, password });
        const token = res.data.token;
        localStorage.setItem("token", token);
        return token;
    } catch (error) {
        console.error("Failed to login:", error.message);
        throw error;
    }
}
