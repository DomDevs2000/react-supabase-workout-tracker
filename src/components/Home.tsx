import React, { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth";
import {Helmet} from 'react-helmet'

const Home = () => {
  const { user } = useAuth();
  const [data, setData] = useState<any>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function getWorkouts() {
      try {
        const { data: workouts, error } = await supabase
          .from("workouts")
          .select("*")
          .eq("userId", user?.id).order('created_at', {ascending: false});
        if (error) {
          throw error;
        }
        setData(workouts);
        setDataLoaded(true);
      } catch (error: any) {
        console.warn(error.message);
      }
    }

    getWorkouts();
  }, [user]);

  const renderWorkoutCard = data.map((data: any) => {
    return (
      <Link
        className="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer"
        to={`/workout/${data.id}`}
      >
        {data.workoutType === "cardio" ? (
          <img
            src={require("../assets/images/running-light.png")}
            className="h-24 w-auto"
            alt=""
          />
        ) : (
          <img
            src={require("../assets/images/dumbbell-light.png")}
            className="h-24 w-auto"
            alt=""
          />
        )}

        <p className="mt-6 py-1 px-3 text-xs text-white bg-red-600 shadow-md rounded-lg">
          {data.workoutType}
        </p>

        <h1 className="mt-8 mb-2 text-center text-xl text-red-600">
          {data.workoutName}
        </h1>
      </Link>
    );
  });

  return (
    <>
      <Helmet>
      <title> Home </title>
      </Helmet>
      <div className="container mt-10 px-4">
        {dataLoaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderWorkoutCard}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <h1 className="text-2xl">Looks empty here...</h1>
            <Link
              className="mt-6 py-2 px-6 rounded-sm  text-sm
      text-white bg-red-600 duration-200 border-solid
      border-2 border-transparent hover:border-red-600 hover:bg-white
      hover:text-red-600"
              to={"/create"}
            >
              Create Workout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
