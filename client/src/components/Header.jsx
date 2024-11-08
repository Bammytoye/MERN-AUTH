import { Link } from "react-router-dom"

function Header() {
    return (
        <div className="bg-[#242424] text-white border-b-2 border-gray-600 sticky top-0 z-50 shadow-lg">
            <div className="flex px-32 py-3 justify-between items-center cursor-pointer">
                <div className="font-bold text-center">
                    <Link to="/">
                        <h1>MERN AUTH</h1>
                        <span>APP</span>
                    </Link>
                </div>

                <div>
                    <ul className="flex space-x-5 text-lg">
                        <Link to='/'>
                            <li className="hover:text-gray-400 border-b-2 border-transparent hover:border-gray-400 transition duration-200">Home</li>
                        </Link>
                        <Link to='/about'>
                            <li className="hover:text-gray-400 border-b-2 border-transparent hover:border-gray-400 transition duration-200">About</li>
                        </Link>
                        <Link to='/sign-in'>
                            <li className="hover:text-gray-400 border-b-2 border-transparent hover:border-gray-400 transition duration-200">Sign In</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
