import axios from "axios";
import IUser from "../types/user";

export const login = (email: string, password: string): Promise<IUser | null> => {
    return axios
        .get(`/api/login?email=${email}&password=${password}`)  // שימוש ב-POST ושיגור נתונים בגוף הבקשה
        .then(response => response.data.user)
        .catch(error => {
            console.error('Login error:', error);
            return null;
        });
};

export default login;
