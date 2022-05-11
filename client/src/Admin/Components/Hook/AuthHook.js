import { useState, useCallback, useEffect } from "react";

export const useAdminAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminId, setAdminId] = useState(false);

    const login = useCallback((id) => {
        setIsLoggedIn(true);
        setAdminId(id);

        localStorage.setItem('adminData', JSON.stringify({
            adminId: id
        }))

    }, []);
    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setAdminId(null);
        localStorage.removeItem('adminData')
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('adminData'))
        ////console.log(storedData)
        if (storedData) {
            login(storedData.adminId);
        }
    }, [login])

    return { login, logout, isLoggedIn, adminId }

}