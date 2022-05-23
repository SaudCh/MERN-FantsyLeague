import { useState, useCallback, useEffect } from "react";

//custom hooks to login and logout user from local storage
export const useUserAuth = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userId, setUserId] = useState(false);

    const userLogin = useCallback((id) => {
        setIsUserLoggedIn(true);
        setUserId(id);

        localStorage.setItem('userData', JSON.stringify({
            userId: id
        }))

    }, []);
    const userLogout = useCallback(() => {
        setIsUserLoggedIn(false);
        setUserId(null);
        localStorage.removeItem('userData')
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'))

        if (storedData) {
            userLogin(storedData.userId);
        }
    }, [userLogin])

    return { userLogin, userLogout, isUserLoggedIn, userId }

}