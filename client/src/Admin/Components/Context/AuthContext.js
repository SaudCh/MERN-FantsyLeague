import { createContext } from "react";

export const AdminAuthContext = createContext({
    isLoggedIn: false,
    adminId: null,
    login: () => { },
    logout: () => { },
});