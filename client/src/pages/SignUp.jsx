import { useState } from "react";
import { Link } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Modal from '../components/Modal';

function SignUp() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [inputErrors, setInputErrors] = useState({ username: false, email: false, password: false });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        // Set input error state to false when user starts typing
        if (value.trim() !== '') {
            setInputErrors({ ...inputErrors, [id]: false });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        const newInputErrors = {
            username: !formData.username.trim(),
            email: !formData.email.trim(),
            password: !formData.password.trim(),
        };

        setInputErrors(newInputErrors);

        // Check if there are any errors
        if (Object.values(newInputErrors).some(error => error)) {
            return; // Prevent submission if there are errors
        }

        try {
            const res = await fetch('http://localhost:4010/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setModalMessage(data.message); // Set success message
                setModalOpen(true); // Open modal
            } else {
                setModalMessage(data.message || 'Something went wrong. Please try again.');
                setModalOpen(true); // Open modal
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            setModalMessage('An error occurred. Please try again.');
            setModalOpen(true); // Open modal
        }
    };

    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 p-4">
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
                        className={`p-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 ${inputErrors.username ? 'border-red-500' : 'border-green-500'}`}
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
                        className={`p-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 ${inputErrors.email ? 'border-red-500' : 'border-green-500'}`}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-gray-700 font-medium">
                        Password:
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} // Toggle between text and password
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className={`p-3 bg-gray-50 border rounded-xl w-full focus:outline-none focus:ring-1 ${inputErrors.password ? 'border-red-500' : 'border-green- 500'}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                            className="absolute right-3 top-4 text-gray-900"
                        >
                            {showPassword ? <LuEyeClosed /> : <LuEye />}
                        </button>
                    </div>
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

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                message={modalMessage}
            />
        </div>
    );
}

export default SignUp;