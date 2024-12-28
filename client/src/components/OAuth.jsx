import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../Firebase';
import { useDispatch } from 'react-redux'

const OAuth = () => {
    const dispatch = useDispatch();
    const handleGoogle = async () => {
        try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider); 
            // console.log(result)
            const res = await fetch('/api/auth/google', {
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
            dispatch(signInSuccess(data));
        } catch(err) {  
            console.log(err)
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