import axios from "axios";
import IUser from "../types/user";


const url = "http://localhost:3000";
// const url = "https://users-bay.vercel.app";

export const login = (email: string, password: string): Promise<IUser | null> => {
    return axios
        .post(`${url}/api/login`, { email, password })
        .then(response => response.data.user) 
        .catch(error => {
            console.error('Login error:', error.response?.data || error.message);
            return null; 
        });
};

export default login;

