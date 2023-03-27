import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import supabase from '../supabase/supabaseClient';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (password === confirmPassword) {
                const {user, session, error} = await supabase.auth.signUp({
                    email: email, password: password,
                });
                console.log(session);
                console.log(user);
                alert('Please Click The Link In Your Email To Verify')
                navigate('/login');
                if (error) throw error;
            } else {
                alert('Password Does Not Match')
            }


        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="max-w-screen-sm mx-auto px-4 py-10">
            <div className="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
                <p className="text-red-500"></p>
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