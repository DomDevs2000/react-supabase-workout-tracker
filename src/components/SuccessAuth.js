import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {supabase} from "../supabase/supabaseClient.js";

const SuccessAuth = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        return () => {
            async function getUserData() {
                await supabase.auth.getUser().then((value) => {
                    if (value.data?.user) {
                        setUser(value.data.user);
                        console.log(value.data.user);
                    }
                });
            }

            getUserData();
        };
    }, []);

    async function logOutUser() {
        const {error} = await supabase.auth.signOut();

        navigate('/');

    }

    return (
        <div>
            <button
                onClick={() => logOutUser()}
            >
                Log Out
            </button>
        </div>

    );

};
export default SuccessAuth;