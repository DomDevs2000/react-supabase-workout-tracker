import React, {useEffect, useState} from 'react';
import supabase from "../supabase/supabaseClient";
import {Link} from "react-router-dom";

const Home = () => {

    const [data, setData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(null);

    useEffect(() => {
        return async () => {
            try {
                const {data: workouts, error} = await supabase.from("workouts").select('*');
                if (error) {
                    throw error;
                }
                setData(workouts);
                setDataLoaded(true);

            } catch (error) {
                console.warn(error.message);
            }
        };
    }, [dataLoaded]);

    return (
        <>
            <div className="container mt-10 px-4">
                {data.length === 0 ?

                    <div className="w-full flex flex-col items-center">
                        <h1 className="text-2xl">Looks empty here...</h1>
                        <Link className="mt-6 py-2 px-6 rounded-sm  text-sm
      text-white bg-red-600 duration-200 border-solid
      border-2 border-transparent hover:border-red-600 hover:bg-white
      hover:text-red-600"
                              to={'/create'}
                        >Create Workout
                        </Link
                        >
                    </div>


                    :

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <Link className="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer"
                            // to={`/view-workout${workoutId}`}>
                              to={'/test'}>

                            {data.workoutType === 'cardio' ?
                                <img
                                    src="../assets/images/running-light.png"
                                    className="h-24 w-auto"
                                    alt=""
                                />

                                :

                                <img
                                    src="../assets/images/dumbbell-light.png"
                                    className="h-24 w-auto"
                                    alt=""
                                />
                            }


                            <p
                                className="mt-6 py-1 px-3 text-xs text-white bg-red-600 shadow-md rounded-lg"
                            >
                                {data.map((data => {
                                    return data.workoutType;
                                }))}
                            </p>

                            <h1 className="mt-8 mb-2 text-center text-xl text-red-600">
                                {data.map((data => {
                                    return data.workoutName;
                                }))}
                            </h1>


                        </Link>
                    </div>
                }
            </div>
        </>

    );
};
export default Home;