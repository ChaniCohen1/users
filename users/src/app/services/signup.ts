import axios from "axios";
import IUser from "../types/user";


export const signup = (username: string, email: string, password: string): Promise<IUser | null> => {
    return axios
        .post('https://users-bay.vercel.app/api/signup', {
            username,
            email,
            password,
        })
        .then(response => response.data) // במקרה של הצלחה, החזרת הנתונים מהשרת
        .catch(error => {
            console.error('Signup error:', error);
            return null;
        });
};