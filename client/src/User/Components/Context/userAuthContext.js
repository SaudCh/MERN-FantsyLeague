import { createContext } from "react";

export const UserAuthContext = createContext({
    isUserLoggedIn: false,
    userId: null,
    userLogin: () => { },
    userLogout: () => { },
});