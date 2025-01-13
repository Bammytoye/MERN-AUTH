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
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const maxSize = 10 * 1024 * 1024; // 10MB

            if (!validTypes.includes(file.type)) {
                setErrorMessage('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
                setSuccessMessage('');
                setTimeout(() => setErrorMessage(''), 5000);
                return;
            }

            if (file.size > maxSize) {
                setErrorMessage('File size exceeds 10MB. Please upload a smaller image.');
                setSuccessMessage('');
                setTimeout(() => setErrorMessage(''), 5000);
                return;
            }

            setImage(URL.createObjectURL(file));
            setErrorMessage('');
            setSuccessMessage('Image uploaded successfully!');
            setTimeout(() => setSuccessMessage(''), 5000);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
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
                setTimeout(() => setErrorMessage(''), 5000);
                return;
            }
            dispatch(updateUserSuccess(data));
            setSuccessMessage('User details updated successfully!');
            setTimeout(() => setSuccessMessage(''), 5000);
            setErrorMessage('');
        } catch (error) {
            dispatch(updateUserFailure(error));
            setErrorMessage('An error occurred while updating.');
            setSuccessMessage('');
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    const handleDelete = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data));
                setErrorMessage('Failed to delete user account');
                setSuccessMessage('');
                setTimeout(() => setErrorMessage(''), 5000);
                return;
            }
            dispatch(deleteUserSuccess(data));
            setSuccessMessage('User account deleted successfully!');
            setTimeout(() => setSuccessMessage(''), 5000);
            setErrorMessage('');
        } catch (error) {
            dispatch(deleteUserFailure(error));
            setErrorMessage('An error occurred while deleting.');
            setSuccessMessage('');
            setTimeout(() => setErrorMessage(''), 5000);
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
                setTimeout(() => setErrorMessage(''), 5000);
                return;
            }
    
            dispatch(logout());
            setSuccessMessage('Successfully logged out');
            setTimeout(() => setSuccessMessage(''), 5000);
    
        } catch (error) {
            setErrorMessage(error);
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };
    

    return (
        <div className="min-h-screen w-full max-w-4xl mx-auto mb-10 mt-10 px-4 sm:px-6 md:px-10">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    ref={fileRef} 
                    hidden 
                    accept="image/*" 
                    onChange={handleFileChange}
                />
                <img 
                    src={isImage || currentUser.profilePicture} 
                    alt="Profile Picture"
                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
                    onClick={() => fileRef.current.click()}
                />

                {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
                {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Username:</label>
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
                    <label htmlFor="email">Email:</label>
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
                    <label htmlFor="Password">Password:</label>
                    <input 
                        type="password" 
                        id="Password" 
                        placeholder="******" 
                        className="outline-none bg-gray-100 rounded-lg p-3"
                        onChange={handleChange}
                    />
                </div>

                <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
                    Update
                </button>    
            </form>

            <div className="flex justify-between mt-5 text-sm sm:text-base">
                <span onClick={handleDelete} className="text-white cursor-pointer bg-red-700 px-4 py-2 rounded-lg hover:bg-red-900">Delete Account</span>
                <span onClick={handleSignOut} className="text-white cursor-pointer bg-red-700 px-4 py-2 rounded-lg hover:bg-red-900">Sign Out</span>
            </div>
        </div>
    );
}

export default Profile;
