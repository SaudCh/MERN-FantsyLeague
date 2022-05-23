import { useContext } from "react";
import { UserAuthContext } from "../Context/userAuthContext";

//custom hook to get login information and functions
export const useChkUserAuth = () => {
    const userAuthContext = useContext(UserAuthContext)

    const { isUserLoggedIn, userId, userLogin, userLogout } = userAuthContext

    return { userLogin, userLogout, isUserLoggedIn, userId }
}