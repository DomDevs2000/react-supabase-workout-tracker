import React, {useEffect, useState} from 'react';
const Navbar = () => {

    return <>
        <header className="text-white bg-red-600">
            <nav className=" py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
                <div className="flex items-center gap-x-4">
                    <img className="w-14" src="../assets/images/dumbbell-light-green.png" alt=""/>
                    <h1 className="text-lg">Workout Tracker</h1>
                </div>
                <ul className="flex flex-1 justify-end gap-x-10">
                    <li>
                        <a href="/#" className="cursor-pointer">
                            <button>Create</button>
                        </a>
                    </li><li>
                    <a href="/login" className="cursor-pointer">
                        <button>Login</button>
                    </a>
                </li>

                        <li className="cursor-pointer">Logout</li>


                </ul>
            </nav>
        </header>
    </>;
};

export default Navbar;