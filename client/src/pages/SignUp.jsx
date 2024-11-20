import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch('http://localhost:4010/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const data = await res.json();
    
            if (res.ok) {
                alert(data.message); // Notify user on success
            } else {
                alert(data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 my-7">
                Create a new account with us
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-8 bg-white text-black rounded-lg shadow-lg w-full max-w-lg"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-gray-700 font-medium">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="username"
                        className="p-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-gray-700 font-medium">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@example.com"
                        className="p-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-gray-700 font-medium">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="p-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-5 p-3 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Sign Up
                </button>

                <div className="flex gap-2 justify-center mt-4 text-gray-600">
                    <p>Have an account?</p>
                    <Link to="/sign-in" className="text-blue-500 hover:underline">
                        Sign in here
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
