import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";

function SignUp() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [inputErrors, setInputErrors] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        // Clear specific input error message when user starts typing
        setInputErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        const newInputErrors = {
            username: formData.username.trim() ? "" : "Username is required.",
            email: formData.email.trim() ? "" : "Email is required.",
            password: formData.password.trim() ? "" : "Password is required.",
        };

        setInputErrors(newInputErrors);

        // Check if there are any validation errors
        if (Object.values(newInputErrors).some((error) => error)) {
            return; // Prevent form submission if validation fails
        }

        setLoading(true); // Set loading to true when submission starts

        try {
            const res = await fetch("http://localhost:4010/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            setLoading(false); // Set loading to false after response

            if (res.ok) {
                navigate("/sign-in"); // Redirect to the sign-in page
            } else {
                alert(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            alert("An error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 my-7">
                Create a new account with us
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-8 bg-white text-black rounded-lg shadow-lg w-full max-w-lg"
            >
                {/* Username Input */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-gray-700 font-medium">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        className={`p-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-1 ${
                            inputErrors.username ? "border-red-500" : "border-gray-300"
                        }`}
                    />
                    {inputErrors.username && <p className="text-red-500 text-sm">{inputErrors.username}</p>}
                </div>

                {/* Email Input */}
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
                    {inputErrors.email && <p className="text-red-500 text-sm">{inputErrors.email}</p>}
                </div>

                {/* Password Input */}
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
                            className="absolute right-3 top-4 text-gray-900"
                        >
                            {showPassword ? <LuEyeClosed /> : <LuEye />}
                        </button>
                    </div>
                    {inputErrors.password && <p className="text-red-500 text-sm">{inputErrors.password}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`mt-5 p-3 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        loading ? "cursor-not-allowed opacity-70" : ""
                    }`}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Register"}
                </button>

                <div className="flex gap-2 justify-center mt-4 text-gray-600">
                    <p>Have an account?</p>
                    <Link to="/sign-in" className="text-blue-500 hover:underline">
                        Log in here
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
