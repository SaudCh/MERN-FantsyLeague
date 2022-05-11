import React from "react";
import { LoggedInUserRouter, LoggedOutUserRouter } from "./User/Components/Router/User";
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useAdminAuth } from './Admin/Components/Hook/AuthHook'
import { useUserAuth } from './User/Components/Hooks/userAuthHook'
import { AdminAuthContext } from "./Admin/Components/Context/AuthContext";
import { UserAuthContext } from "./User/Components/Context/userAuthContext";



function App() {
  const { login, logout, isLoggedIn, adminId } = useAdminAuth()
  const { isUserLoggedIn, userId, userLogin, userLogout } = useUserAuth()

  return (
    <AdminAuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        adminId: adminId,
        login: login,
        logout: logout,
      }}
    >
      <UserAuthContext.Provider
        value={{
          isUserLoggedIn: isUserLoggedIn,
          userId: userId,
          userLogin: userLogin,
          userLogout: userLogout
        }}
      >
        <Router basename='/'>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {isUserLoggedIn ? <LoggedInUserRouter /> : <LoggedOutUserRouter />}

        </Router>
      </UserAuthContext.Provider>
    </AdminAuthContext.Provider >
  );
}

export default App;
