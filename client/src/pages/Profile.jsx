import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from 'react';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/User/UserSlice'


function Profile() {
    const dispatch = useDispatch()
    const { currentUser  } = useSelector(state => state.user);
    const fileRef = useRef(null);
    const [isImage, setImage] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData ] = useState({})

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
                return;
            }

            if (file.size > maxSize) {
                setErrorMessage('File size exceeds 2MB. Please upload a smaller image.');
                setSuccessMessage('');
                return;
            }

            // If validation passes, set the image and clear messages
            setImage(URL.createObjectURL(file));
            setErrorMessage('');
            setSuccessMessage('Image uploaded successfully!');
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Handle form submission
        try {
            dispatch(updateUserStart())
            const res = await fetch(`http://localhost:4010/api/users/update/${currentUser._id}`, {
                method: 'POST',
                header: {   
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json()
            if (data.success === false) {
                dispatch(updateUserFailure(data))
                return;
            }
            dispatch(updateUserSuccess(data));
        } catch (error) {
            dispatch(updateUserFailure(error)) 
        }
    }

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
                        defaultValue={currentUser .username} 
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
                        defaultValue={currentUser .email} 
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
                <span className="text-red-700 cursor-pointer">Delete Account</span>
                <span className="text-red-700 cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}

export default Profile;