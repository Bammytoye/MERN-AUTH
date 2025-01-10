import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function Header() {
    const {currentUser} = useSelector(state => state.user)

    return (
        <div className="bg-gray-900 text-white border-b-2 border-gray-600 sticky top-0 z-50 shadow-lg">
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
                        <Link to='/profile'>
                            {
                                currentUser ? (
                                    <img src={currentUser.profilePicture || '/client/src/profile image.png'} 
                                    alt='profile' 
                                    className="h-7 w-7 rounded-full object-cover "
                                    /> 
                                ) : (
                                    <li className="hover:text-gray-400 border-b-2 border-transparent hover:border-gray-400 transition duration-200">Sign In</li>
                                )
                            }
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
