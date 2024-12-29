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

function App() {

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
