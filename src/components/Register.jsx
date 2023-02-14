import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import supabase from '../supabase/supabaseClient';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            })
            if (error) throw error;
            navigate('/login');
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
                <h1 className="text-3xl text-at-light-green mb-4">Register</h1>

                <div className="flex flex-col mb-2">
                    <label  className="mb-1 text-sm text-at-light-green">Email</label>
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
                    <label  className="mb-1 text-sm text-at-light-green">Password</label>
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
                    <label  className="mb-1 text-sm text-at-light-green"
                    >Confirm Password</label
                    >
                    <input
                        type="password"
                        name="password"
                        required
                        className="p-2 text-gray-500 focus:outline-none"
                        id="confirmPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-at-light-green duration-200 border-solid
      border-2 border-transparent hover:border-at-light-green hover:bg-white
      hover:text-at-light-green"
                >
                    Register
                </button>

                <Link to={'/login'} className="text-sm mt-6 text-center">
                    Already have an account? <span className="text-at-light-green">Login</span>
                </Link>
            </form>
        </div>)
};

export default Register;