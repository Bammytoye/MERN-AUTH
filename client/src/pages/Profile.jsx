import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
} from "../redux/User/UserSlice";

function Profile() {
    const dispatch = useDispatch();
    const { currentUser, loading} = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [formData, setFormData] = useState({});
    const [isImage, setImage] = useState(currentUser?.profilePicture || "");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ["image/jpeg", "image/png", "image/gif"];
            const maxSize = 10 * 1024 * 1024; // 10MB

            if (!validTypes.includes(file.type)) {
                setErrorMessage("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
                setSuccessMessage("");
                return;
            }

            if (file.size > maxSize) {
                setErrorMessage("File size exceeds 10MB. Please upload a smaller image.");
                setSuccessMessage("");
                return;
            }

            setImage(URL.createObjectURL(file));
            setErrorMessage("");
            setSuccessMessage("Image uploaded successfully!");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            dispatch(updateUserStart());
            const res = await fetch(`http://localhost:4010/api/users/update/${currentUser._id}`, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json',
                    "Authorization": `Bearer ${currentUser.token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!data.success) {
                dispatch(updateUserFailure(data));
                setErrorMessage(data.message || "Something went wrong.");
                setSuccessMessage("");
                return;
            }

            dispatch(updateUserSuccess(data));
            setErrorMessage("");
            setSuccessMessage("Profile updated successfully!");
        } catch (error) {
            dispatch(updateUserFailure(error));
            setErrorMessage("Failed to update profile. Please try again.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="min-h-screen w-[650px] mx-auto mb-10">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <img
                    src={isImage}
                    alt="Profile Picture"
                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
                    onClick={() => fileRef.current.click()}
                />

                {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
                {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username:</label>
                    <input
                        defaultValue={formData.username}
                        type="text"
                        id="username"
                        placeholder="Username"
                        className="outline-none bg-gray-100 rounded-lg p-3"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email:</label>
                    <input
                        defaultValue={formData.email}
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="outline-none bg-gray-100 rounded-lg p-3"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="******"
                        className="outline-none bg-gray-100 rounded-lg p-3"
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {
                        loading ? 'loading...' : 'Update'
                    }
                </button>
            </form>

            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">Delete Account</span>
                <span className="text-red-700 cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}

export default Profile;
