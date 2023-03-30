import React, {useEffect, useState} from 'react';
import supabase from "../lib/supabaseClient";

import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState({});
    // const navigate = useNavigate()

    supabase.auth.getUser();

    useEffect(() => {
        return () => {
            async function getUserData() {
                await supabase.auth.getUser().then((value) => {
                    if (value.data?.user) {
                        setUser(value.data.user);
                        // console.log(value.data.user);
                    }
                });
            }
            getUserData();
        };
    }, []);

    async function logOutUser() {
        const {error} = await supabase.auth.signOut();
        console.log("user logged out")
        // navigate('/login');
    }

    return <>
        <header className="text-white bg-red-600">
            <nav className=" py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
                <div className="flex items-center gap-x-4">
                    <img className="w-14" src={require('../assets/images/dumbbell-light.png')} alt=""/>
                    <a href="/" className="cursor-pointer">
                        <button><h1 className="text-lg">Workout Tracker</h1></button>
                    </a>

                </div>
                <ul className="flex flex-1 justify-end gap-x-10">
                    <li>
                        <a href="/create" className="cursor-pointer">
                            <button>Track Workout</button>
                        </a>
                    </li>

                    {Object.keys(user).length > 0 ?
                        <li className="cursor-pointer"
                        >   <a href="/login" onClick={() => {
                            logOutUser();
                        }}>Logout</a></li>
                        : <a href="/login" className="cursor-pointer">
                            <button>Login</button>
                        </a>
                    }
                </ul>
            </nav>
        </header>
    </>;
};

export default Navbar;