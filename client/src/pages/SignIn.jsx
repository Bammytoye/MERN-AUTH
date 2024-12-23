import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Modal from '../components/Modal'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SignIn() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [inputErrors, setInputErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalError, setModalError] = useState({ isOpen: false, title: "", message: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setInputErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    };

    const validateInputs = () => {
        const errors = {};
        if (!formData.email.trim()) errors.email = "Email is required.";
        if (!formData.password.trim()) errors.password = "Password is required.";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateInputs();
        setInputErrors(errors);

        if (Object.keys(errors).length > 0) return;

        setLoading(true);

        try {
            const res = await fetch("http://localhost:4010/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            setLoading(false);

            if (res.ok) {
                navigate("/"); // Redirect on successful login
            } else {
                setModalError({
                    isOpen: true,
                    title: "Login Failed",
                    message: data.message || "Invalid credentials. Please try again.",
                });
            }
        } catch (error) {
            setLoading(false);
            setModalError({
                isOpen: true,
                title: "Network Error",
                message:
                    error.message === "Failed to fetch"
                        ? "Please check your internet connection and try again."
                        : "An unexpected error occurred. Please try again.",
            });
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 h-[80vh]">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-7">Log In</h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-8 bg-white text-black rounded-lg shadow-lg w-full max-w-lg"
            >
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
                        className={`p-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 ${
                            inputErrors.email ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {inputErrors.email && (
                        <p className="text-red-500 text-sm">{inputErrors.email}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-gray-700 font-medium">
                        Password:
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className={`p-3 bg-gray-50 border rounded-xl w-full focus:outline-none focus:ring-1 ${
                                inputErrors.password ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-4 text-gray-500"
                        >
                            {showPassword ? <LuEyeClosed /> : <LuEye />}
                        </button>
                    </div>
                    {inputErrors.password && (
                        <p className="text-red-500 text-sm">{inputErrors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className={`mt-5 p-3 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        loading ? "cursor-not-allowed opacity-70" : ""
                    }`}
                    disabled={loading}
                >
                    {loading ? <AiOutlineLoading3Quarters className="animate-spin mx-auto" /> : "Log In"}
                </button>

                <div className="flex gap-2 justify-center mt-4 text-gray-600">
                    <p>Don&#39;t have an account?</p>
                    <Link to="/sign-up" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </div>
            </form>

            {/* Error Modal */}
            <Modal
                isOpen={modalError.isOpen}
                onClose={() => setModalError({ isOpen: false, title: "", message: "" })}
                title={modalError.title}
                message={modalError.message}
            />
        </div>
    );
}

export default SignIn;
