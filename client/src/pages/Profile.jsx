import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from 'react';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, logout } from '../redux/User/UserSlice';

function Profile() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const fileRef = useRef(null);
    const [isImage, setImage] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({});

    // Function to handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size (e.g., max 2MB)
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const maxSize = 10 * 1024 * 1024; // 2MB

            if (!validTypes.includes(file.type)) {
                setErrorMessage('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
                setSuccessMessage('');
                setTimeout(() => setErrorMessage(''), 5000); // Clear error after 5 seconds
                return;
            }

            if (file.size > maxSize) {
                setErrorMessage('File size exceeds 10MB. Please upload a smaller image.');
                setSuccessMessage('');
                setTimeout(() => setErrorMessage(''), 5000); // Clear error after 5 seconds
                return;
            }

            // If validation passes, set the image and clear messages
            setImage(URL.createObjectURL(file));
            setErrorMessage('');
            setSuccessMessage('Image uploaded successfully!');
            setTimeout(() => setSuccessMessage(''), 5000); // Clear success after 5 seconds
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {  // Check this endpoint
                method: 'POST',
                headers: {   
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data));
                setErrorMessage('Failed to update user details');
                setSuccessMessage('');
                setTimeout(() => setErrorMessage(''), 5000); // Clear error after 5 seconds
                return;
            }
            dispatch(updateUserSuccess(data));
            setSuccessMessage('User details updated successfully!');
            setTimeout(() => setSuccessMessage(''), 5000); // Clear success after 5 seconds
            setErrorMessage('');
        } catch (error) {
            dispatch(updateUserFailure(error));
            setErrorMessage('An error occurred while updating.');
            setSuccessMessage('');
            setTimeout(() => setErrorMessage(''), 5000); // Clear error after 5 seconds
        }
    };

    const handleDelete = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {  // Check this endpoint
                method: 'DELETE',
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data));
                setErrorMessage('Failed to delete user account');
                setSuccessMessage('');
                setTimeout(() => setErrorMessage(''), 5000); // Clear error after 5 seconds
                return;
            }
            dispatch(deleteUserSuccess(data));
            setSuccessMessage('User account deleted successfully!');
            setTimeout(() => setSuccessMessage(''), 5000); // Clear success after 5 seconds
            setErrorMessage('');
        } catch (error) {
            dispatch(deleteUserFailure(error));
            setErrorMessage('An error occurred while deleting.');
            setSuccessMessage('');
            setTimeout(() => setErrorMessage(''), 5000); // Clear error after 5 seconds
        }
    };

    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/auth/signOut', {
                method: 'POST', 
            });
            
            if (!res.ok) {
                throw new Error('Failed to log out, server error');
            }
    
            const data = await res.json();
    
            if (data.success === false) {
                setErrorMessage('Failed to logout');
                setSuccessMessage('');
                setTimeout(() => setErrorMessage(''), 5000); // Clear error after 5 seconds
                return;
            }
    
            dispatch(logout()); // Dispatch logout action only if successful
            setSuccessMessage('Successfully logged out');
            setTimeout(() => setSuccessMessage(''), 5000); // Clear success message after 5 seconds
    
        } catch (error) {
            console.log(error);
            setErrorMessage('An unexpected error occurred');
            setTimeout(() => setErrorMessage(''), 5000); // Clear error after 5 seconds
        }
    };
    

    return (
        <div className="min-h-screen w-[650px] mx-auto mb-10">
            <h1 className="text-3xl font-semibold text-center my-7">
                Profile
            </h1>

            <form action="" 
                className="flex flex-col gap-6"
                onSubmit={handleSubmit}
            >
                <input 
                    type="file" 
                    ref={fileRef} 
                    hidden 
                    accept="image/*" 
                    onChange={handleFileChange} // Handle file change
                />
                <img 
                    src={isImage || currentUser.profilePicture} // Show uploaded image or default profile picture
                    alt="Profile Picture"
                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
                    onClick={() => fileRef.current.click()} // Trigger file input click
                />

                {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
                {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

                <div className="flex flex-col gap-1"> 
                    <label htmlFor="">Username:</label>
                    <input 
                        defaultValue={currentUser.username} 
                        type="text" 
                        id="username" 
                        placeholder="Username" 
                        className="outline-none bg-gray-100 rounded-lg p-3"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="">Email:</label>
                    <input 
                        defaultValue={currentUser.email} 
                        type="email" 
                        id="email" 
                        placeholder="Email" 
                        className="outline-none bg-gray-100 rounded-lg p-3"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="">Password:</label>
                    <input 
                        type="password" 
                        id="Password" 
                        placeholder="******" 
                        className="outline-none bg-gray-100 rounded-lg p-3"
                        onChange={handleChange}
                    />
                </div>

                <button 
                    className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
                >
                    Update
                </button>    
            </form>

            <div className="flex justify-between mt-5">
                <span onClick={handleDelete} className="text-red-700 cursor-pointer">Delete Account</span>
                <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}

export default Profile;
