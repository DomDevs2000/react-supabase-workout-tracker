import React from 'react';
import {Auth, ThemeSupa} from "@supabase/auth-ui-react";
import {useNavigate} from "react-router-dom";
import {supabase} from "../supabase/supabaseClient.js";

export default function AuthUser() {
    const navigate = useNavigate();
    supabase.auth.onAuthStateChange(async (event) => {
        if (event !== "SIGNED_OUT") {
            navigate('/auth');
        } else {
            navigate('/');
        }
    });

    return <Auth
        supabaseClient={supabase}
        appearance={{
            theme: ThemeSupa,
            variables: {
                default: {
                    colors: {
                        brand: 'red',
                        brandAccent: 'darkred',
                    },
                },
            },

        }}
        theme="dark"
    />;

};