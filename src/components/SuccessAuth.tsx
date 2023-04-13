import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabaseClient";
import { useAuth } from "../context/Auth";

const SuccessAuth = () => {
  const { user } = useAuth();
  const { signOut } = useAuth();
  supabase.auth.getUser();
  const navigate = useNavigate();
  console.log("auth", user);

  const logOutUser = () => {
    signOut();
    navigate("/");
  };

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
