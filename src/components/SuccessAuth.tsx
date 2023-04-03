import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabaseClient";

const SuccessAuth = () => {
  const [user, setUser] = useState({});
  supabase.auth.getUser();
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
console.log('success auth', user,   Object.keys(user))
  async function logOutUser() {
    const { error } = await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <div>
      {user ? (
        <>
          <h1>Success</h1>
          <button onClick={() => logOutUser()}>Log Out</button>
        </>
      ) : (
        <>
          <h1>User is not logged in</h1>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Go Home
          </button>
        </>
      )}
    </div>
  );
};
export default SuccessAuth;
