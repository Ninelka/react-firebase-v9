import './App.css';
import Form from './components/common/form';
import Home from "./components/home";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {useEffect, useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {app} from "./firebase-config";

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }
    }, [navigate])

    const handleAction = (id) => {
        const authentication = getAuth(app);

        if (id === 1) {
            signInWithEmailAndPassword(authentication, email, password)
                .then((response) => {
                    navigate('/home')
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                })
                .then(() => {
                    toast.success('Successful login');
                })
                .catch((error) => {
                    console.log(error)
                    if (error.code === 'auth/wrong-password') {
                        toast.error('Please check the Password');
                    }
                    if (error.code === 'auth/user-not-found') {
                        toast.error('Please check the Email');
                    }
                    if (error.code === 'auth/invalid-email') {
                        toast.error('Please fill the Form');
                    }
                })
        }

        if (id === 2) {
            createUserWithEmailAndPassword(authentication, email, password)
                .then((response) => {
                    navigate('/home');
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                })
                .catch((error) => {
                    if (error.code === 'auth/wrong-password') {
                        toast.error('Please check the Password');
                    }
                    if (error.code === 'auth/user-not-found') {
                        toast.error('Please check the Email');
                    }
                    if (error.code === 'auth/email-already-in-use') {
                        toast.error('Email Already in Use');
                    }
                })
        }

        if (id === 3) {
            signInWithPopup(authentication, googleProvider)
                .then((response) => {
                    navigate('/home');
                    sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                })
                .catch((error) => {
                    toast.error(error)
                })
        }
    }

    return (
        <div className="App">
            <>
                <ToastContainer/>
                <Routes>
                    <Route
                        path="*"
                        element={<Navigate to="/login"/>}
                    />
                    <Route path='/login'
                           element={<Form title="Login" setEmail={setEmail} setPassword={setPassword}
                                          handleAction={() => handleAction(1)} googleHandleAction={() => handleAction(3)}/>}/>
                    <Route path='/register'
                           element={<Form title="Register" setEmail={setEmail}
                                          setPassword={setPassword} handleAction={() => handleAction(2)}/>}/>
                    <Route path='/home' element={<Home/>}/>
                </Routes>
            </>
        </div>
    );
}

export default App;
