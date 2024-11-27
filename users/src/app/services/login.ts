import axios from "axios";
import IUser from "../types/user";

export const login = (email: string, password: string): Promise<IUser | null> => {
    return axios
        .post(`https://users-bay.vercel.app/api/login`, { email, password })
        .then(response => response.data.user) 
        .catch(error => {
            console.error('Login error:', error.response?.data || error.message);
            return null; 
        });
};

export default login;

