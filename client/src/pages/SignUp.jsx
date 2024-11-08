import { Link } from "react-router-dom"

function SignUp() {
    return (
        <div>
            <div className="flex flex-col justify-center items-center max-w-lg p-3 mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-100 my-7">
                    Create a new account with us
                </h1>

                <form
                    action=""
                    className="flex flex-col gap-5 p-8 rounded-lg shadow-md w-full "
                >
                    <div className="flex flex-col gap-1">
                        <label htmlFor="firstName" className="text-gray-100 font-medium">
                            First Name:
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Bammy"
                            className="p-3 bg-transparent border  rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="lastName" className="text-gray-100 font-medium">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Toye"
                            className="p-3 bg-transparent border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="text-gray-100 font-medium">
                            Username:
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="username"
                            className="p-3 bg-transparent border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-gray-100 font-medium">
                            Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@example.com"
                            className="p-3 bg-transparent border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-gray-100 font-medium">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="p-3 bg-transparent border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-5 uppercase p-3 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="flex gap-2">
                    <p>Have an account?</p>
                    <Link to='/sign-in'>
                        <span className="text-blue-500 cursor-pointer">Sign in here</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp