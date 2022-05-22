import { createContext } from "react";

//context to store admin login state and admin data
export const AdminAuthContext = createContext({
    isLoggedIn: false,
    adminId: null,
    login: () => { },
    logout: () => { },
});