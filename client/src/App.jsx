import { BrowserRouter, Routes, Route } from "react-router-dom"
// pages
import HomePage from "./pages/HomePage"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"

// components
import Header from "./components/Header"
import Footer from './components/Footer'
import PrivateRoute from "./components/PrivateRoute"

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../src/redux/User/UserSlice";

function App() {

  const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user")); // Optional: If you store user info

        if (token && user) {
            dispatch(loginSuccess({ user, token }));
        }
    }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        
        <Route element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
