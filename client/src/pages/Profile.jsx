import { useSelector } from "react-redux"

function Profile() {
    const { currentUser} = useSelector(state => state.user)


    return (
        <div className="min-h-screen w-[650px]  mx-auto mb-10">
            <h1 className="text-3xl font-semibold text-center my-7">
                Profile
            </h1>    

            <form action=""
                className="flex flex-col gap-6"
            >
                <img 
                    src={currentUser.profilePicture} 
                    alt="Profile Picture"
                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
                    />

                <div className="flex flex-col gap-1">
                    <label htmlFor="">Username:</label>
                    <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="outline-none bg-gray-100 rounded-lg p-3"/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="">Email:</label>
                    <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="outline-none bg-gray-100 rounded-lg p-3"/>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="">Password:</label>
                    <input type="password" id="Password" placeholder="******" className="outline-none bg-gray-100 rounded-lg p-3"/>
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
    )
}

export default Profile