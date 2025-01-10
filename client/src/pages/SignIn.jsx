import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Modal from '../components/Modal';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { loginStart, loginSuccess, loginFailure } from "../redux/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function SignIn() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const { loading } = useSelector((state) => state.user);
    const [modalError, setModalError] = useState({ isOpen: false, title: "", message: "" });
    const [localError, setLocalError] = useState(""); // Local error state
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
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
        if (Object.keys(errors).length > 0) {
            setModalError({
                isOpen: true,
                title: 'Input Error',
                message: Object.values(errors).join(' ')
            });
            return;
        }

        dispatch(loginStart());

        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                dispatch(loginSuccess(data));
                navigate("/");
            } else {
                dispatch(loginFailure(data.message || "Invalid credentials. Please try again."));
                setModalError({
                    isOpen: true,
                    title: "Login Failed",
                    message: data.message || "Invalid credentials. Please try again.",
                });
                setLocalError(data.message || "Invalid credentials. Please try again."); // Set local error
            }
        } catch (error) {
            // Handle network errors
            const errorMessage = error.message === "Failed to fetch"
                ? "Please check your internet connection and try again."
                : "An unexpected error occurred. Please try again.";
            dispatch(loginFailure(errorMessage));
            setModalError({
                isOpen: true,
                title: "Network Error",
                message: errorMessage,
            });
            setLocalError(errorMessage); // Set local error for display
        }
    };

    // Effect to clear the local error after a delay
    useEffect(() => {
        if (localError) {
            const timer = setTimeout(() => {
                setLocalError(""); // Clear the local error after 5 seconds
            }, 5000); // Adjust the duration as needed (5000 ms = 5 seconds)

            return () => clearTimeout(timer); // Cleanup the timer on unmount or when localError changes
        }
    }, [localError]);

    return (
        <div className="flex flex-col items-center h-[100vh] py-20">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-7">Log In</h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-8 bg-white text-black w-full max-w-lg"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-gray-700 font-medium">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange= {handleChange}
                        placeholder="example@example.com"
                        className={`p-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 ${
                            localError && localError.includes('Email') ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-gray-700 font-medium">Password:</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className={`p-3 bg-gray-50 border w-full rounded-xl focus:outline-none focus:ring-1 ${
                                localError && localError.includes('Password') ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-4"
                        >
                            {showPassword ? <LuEyeClosed /> : <LuEye />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className={`mt-5 p-3 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        loading ? "cursor-not-allowed opacity-70" : ""
                    }`}
                >
                    {loading ? <AiOutlineLoading3Quarters className="animate-spin mx-auto" /> : "Log In"}
                </button>
                <OAuth />
            </form>

            {modalError.isOpen && (
                <Modal
                    title={modalError.title}
                    message={modalError.message}
                    onClose={() => setModalError({ ...modalError, isOpen: false })}
                />
            )}

            {localError && (
                <p className='text-red-700 italic'>
                    {localError}
                </p>
            )}

            <p className="mt-5 text-gray-600">
                Don&#39;t have an account? <Link to="/register" className="text-blue-500 underline">Register</Link>
            </p>
        </div>
    );
}

export default SignIn;