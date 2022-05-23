import { createContext } from "react";

//user authenication context
export const UserAuthContext = createContext({
    isUserLoggedIn: false,
    userId: null,
    userLogin: () => { },
    userLogout: () => { },
});