import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import supabase from '../lib/supabaseClient';

const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (password.length < 6) {
                setErrorMessage('Password Must Be Greater Than 6 Characters')
            } else if (password === confirmPassword) {

                const {error} = await supabase.auth.signUp({
                    email: email, password: password,
                });
                setErrorMessage('Please Click The Link In Your Email To Verify Your Account')
                navigate('/login');
                if (error) {
                    console.error(error);
                }
            } else {
                setErrorMessage('Passwords Do Not Match')
            }
        } catch (error: any) {
            setErrorMessage(error.message)
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="max-w-screen-sm mx-auto px-4 py-10">
            <div className="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
                <p className="text-red-500">
                    {errorMessage}
                </p>
            </div>

            <form
                onSubmit={handleLogin}
                className="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
            >
                <h1 className="text-3xl text-red-600 mb-4">Register</h1>

                <div className="flex flex-col mb-2">
                    <label className="mb-1 text-sm text-red-600">Email</label>
                    <input
                        type="text"
                        required
                        className="p-2 text-gray-500 focus:outline-none"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <label className="mb-1 text-sm text-red-600">Password</label>
                    <input
                        type="password"
                        required
                        className="p-2 text-gray-500 focus:outline-none"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <label className="mb-1 text-sm text-red-600"
                    >Confirm Password</label
                    >
                    <input
                        type="password"
                        name="password"
                        required
                        className="p-2 text-gray-500 focus:outline-none"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-red-600 duration-200 border-solid
      border-2 border-transparent hover:border-red-600 hover:bg-white
      hover:text-red-600"
                >
                    Register
                </button>
                <Link to={'/login'} className="text-sm mt-6 text-center">
                    Already have an account? <span className="text-red-600">Login</span>
                </Link>
            </form>
        </div>);
};

export default Register;