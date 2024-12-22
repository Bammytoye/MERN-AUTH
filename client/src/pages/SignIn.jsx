import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";

function SignIn() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [inputErrors, setInputErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        // Clear specific input error when user types
        setInputErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    };

    // Validate inputs
    const validateInputs = () => {
        const errors = {};
        if (!formData.email.trim()) errors.email = "Email is required.";
        if (!formData.password.trim()) errors.password = "Password is required.";
        return errors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform validation
        const errors = validateInputs();
        setInputErrors(errors);

        if (Object.keys(errors).length > 0) return; // Prevent submission if errors exist

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
                alert(data.message || "Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 h-screen justify-center">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-7">Log In</h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-8 bg-white text-black rounded-lg shadow-lg w-full max-w-lg"
            >
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
                    {inputErrors.email && (
                        <p className="text-red-500 text-sm">{inputErrors.email}</p>
                    )}
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
                            className="absolute right-3 top-4 text-gray-500"
                        >
                            {showPassword ? <LuEyeClosed /> : <LuEye />}
                        </button>
                    </div>
                    {inputErrors.password && (
                        <p className="text-red-500 text-sm">{inputErrors.password}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`mt-5 p-3 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        loading ? "cursor-not-allowed opacity-70" : ""
                    }`}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Log In"}
                </button>

                {/* Registration Redirect */}
                <div className="flex gap-2 justify-center mt-4 text-gray-600">
                    <p>Don&#39;t have an account?</p>
                    <Link to="/sign-up" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
