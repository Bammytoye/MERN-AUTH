import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../Firebase';
import { useDispatch } from 'react-redux'
import { loginSuccess } from "../redux/User/UserSlice";
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoogle = async () => {
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider); 
            // console.log(result)
            const res = await fetch('http://localhost:4010/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            })
            const data = await res.json();
            console.log(data);
            dispatch(loginSuccess(data));
            navigate('/');
        } catch(error) {  
            console.log('could not login with google', error)
        }
    }

    return (
        <button 
            type="button"
            onClick={handleGoogle}
            className='bg-red-600 text-white rounded-2xl p-3 uppercase hover:opacity-95'>
            Continue with google
        </button>
    );
}

export default OAuth;