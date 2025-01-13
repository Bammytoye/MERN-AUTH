import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaUser, FaBars, FaTimes } from "react-icons/fa"; 

function Header() {
    const { currentUser } = useSelector(state => state.user)
    const [menuOpen, setMenuOpen] = useState(false)

    
    const toggleMenu = () => setMenuOpen(!menuOpen)

    return (
        <div className="bg-gray-900 text-white border-b-2 border-gray-600 sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo Section */}
                <div className="font-bold text-2xl">
                    <Link to="/" className="flex items-center space-x-2">
                        <h1 className="md:text-3xl text-white">MERN</h1>
                        <span className="md:text-lg text-gray-300">AUTH</span>
                    </Link>
                </div>

                {/* Desktop Navigation Menu */}
                <div className="hidden md:flex space-x-8 text-lg">
                    <Link to="/" className="hover:text-gray-400 transition duration-200">Home</Link>
                    <Link to="/about" className="hover:text-gray-400 transition duration-200">About</Link>
                    <Link to="/profile" className="flex items-center space-x-2 hover:text-gray-400 transition duration-200">
                        {
                            currentUser ? (
                                <img src={currentUser.profilePicture || '/client/src/profile image.png'}
                                    alt="profile"
                                    className="h-8 w-8 rounded-full object-cover" />
                            ) : (
                                <FaUser className="text-2xl" />
                            )
                        }
                        <span>{currentUser ? 'Profile' : 'Sign In'}</span>
                    </Link>
                </div>

                {/* Mobile Hamburger Icon */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-2xl">
                        {menuOpen ? <FaTimes /> : <FaBars />} 
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden ${menuOpen ? "block" : "hidden"} bg-gray-800 py-4`}>
                <div className="flex flex-col items-center space-y-6">
                    <Link to="/" onClick={toggleMenu} className="text-lg text-white hover:text-gray-400 transition duration-200">
                        Home
                    </Link>
                    <Link to="/about" onClick={toggleMenu} className="text-lg text-white hover:text-gray-400 transition duration-200">
                        About
                    </Link>
                    <Link to="/profile" onClick={toggleMenu} className="flex items-center text-lg text-white hover:text-gray-400 transition duration-200">
                        {
                            currentUser ? (
                                <img src={currentUser.profilePicture || '/client/src/profile image.png'}
                                    alt="profile"
                                    className="h-8 w-8 rounded-full object-cover" />
                            ) : (
                                <FaUser className="text-2xl" />
                            )
                        }
                        <span>{currentUser ? 'Profile' : 'Sign In'}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header;
