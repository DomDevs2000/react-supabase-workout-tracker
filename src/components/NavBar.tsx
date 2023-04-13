import React from "react";
import {useAuth} from "../context/Auth";

const Navbar = () => {
    const {user} = useAuth();
    const {signOut} = useAuth()
    console.log(user)


    const logOutUser = () => {
        signOut()
        localStorage.removeItem("sb-snturtquxvvxlltvqekf-auth-token");
        console.log("User Logged Out");
    }

    return (
        <>
            <header className="text-white bg-red-600">
                <nav className=" py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
                    <div className="flex items-center gap-x-4">
                        <img
                            className="w-14"
                            src={require("../assets/images/dumbbell-light.png")}
                            alt=""
                        />
                        <a href="/" className="cursor-pointer">
                            <button>
                                <h1 className="text-lg">Workout Tracker</h1>
                            </button>
                        </a>
                    </div>
                    <ul className="flex flex-1 justify-end gap-x-10">
                        <li>
                            <a href="/create" className="cursor-pointer">
                                <button>Track Workout</button>
                            </a>
                        </li>

                        {user  ? (
                            <li className="cursor-pointer">
                                {" "}
                                <a
                                    href="/login"
                                    onClick={() => {
                                        logOutUser()
                                    }}
                                >
                                    Logout
                                </a>
                            </li>
                        ) : (
                            <a href="/login" className="cursor-pointer">
                                <button>Login</button>
                            </a>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
