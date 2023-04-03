import React, {SetStateAction, useEffect, useState} from "react";
import supabase from "../lib/supabaseClient";
import {uid} from "uid";
import {useNavigate, useParams} from "react-router-dom";

type Exercise = {

    exercise: any,
    reps: any,
    sets: any,
    weight: any,
}
type TUpdate = { Update: any, workoutName: string, exercises: Exercise[] };
const ViewWorkout = () => {
    const navigate = useNavigate();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [user, setUser] = useState<any>("");
    const [data, setData] = useState<any>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [editMode, setEditMode] = useState<boolean>(false);
    const [exercise, setExercise] = useState("");
    const [workoutName, setWorkoutName] = useState<string>("");
    const [workoutType, setWorkoutType] = useState<string>("");
    const [sets, setSets] = useState<number>();
    const [reps, setReps] = useState<number>();
    const [weight, setWeight] = useState<number>();
    const [cardioType, setCardioType] = useState();
    const [pace, setPace] = useState<number>();
    const [distance, setDistance] = useState<number>();
    const [duration, setDuration] = useState<number>();


    const {id} = useParams<string>();
    const workoutId = id;
    console.log(workoutId);

    useEffect(() => {
        return () => {
            async function getData() {
                try {
                    const {data: workouts, error} = await supabase
                        .from("workouts")
                        .select("*")
                        .eq("id", workoutId);
                    if (error) {
                        console.error(error)
                        throw error
                    }
                    data.value = workouts[0];
                    setDataLoaded(true);
                    console.log(data.value);

                    if (data.value.workoutType === "strength") {
                        setExercise(data.value.exercises[0].exercise);
                        setWorkoutName(data.value.workoutName);
                        setWorkoutType(data.value.workoutType);
                        setReps(data.value.exercises[0].reps);
                        setSets(data.value.exercises[0].sets);
                        setWeight(data.value.exercises[0].weight);
                    } else {
                        setWorkoutName(data.value.workoutName);
                        setWorkoutName(data.value.workoutType);
                        setCardioType(data.value.cardioType);
                        setDuration(data.value.exercises[0].duration);
                        setDistance(data.value.exercises[0].distance);
                        setPace(data.value.exercises[0].pace);
                    }
                    console.log(data.value.workoutName);
                    console.log(data.value.workoutType);
                    console.log(data.value.exercises[0].exercise);
                } catch (error: any) {
                    setErrorMessage(error.message);
                }
            }

            getData();
        };
    }, [data, workoutId]);

    useEffect(() => {
        return () => {
            async function getUser() {
                await supabase.auth.getUser().then((value) => {
                    if (value.data?.user) {
                        setUser(value.data.user);
                        console.log(value.data.user);
                    }
                });
            }

            getUser();
        };
    }, [dataLoaded]);

    const getId = data.map((item: any, index: any) => item.id);
    console.log('id',getId)
    const addExercise = () => {
        if (workoutType === "strength") {
            data.value.exercises.push({
                id: uid(),
                exercise: exercise,
                sets: sets,
                reps: reps,
                weight: weight,
            });
            return;
        }
        data.value.exercises.push({
            id: uid(),
            cardioType: cardioType,
            distance: distance,
            duration: duration,
            pace: pace,
        });
    };
    // Delete exercise
    const deleteExercise = (id: number) => {
        if (data.value.exercises.length > 1) {
            data.value.exercises = data.value.exercises.filter(
                (exercise: any) => exercise.id !== id
            );
            return;
        }
        setErrorMessage("Cannot remove, need to at least have one exercise");
    };
    const deleteWorkout = async () => {
        try {
            const {error} = await supabase
                .from("workouts")
                .delete()
                .eq("id", workoutId);
            if (error) throw error;
            navigate("/");
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };
    // Update Workout
    const update = async () => {
        try {
            const {error} = await supabase
                .from("workouts")
                .update<TUpdate>({
                    Update: undefined,
                    workoutName: data.value.workoutName,
                    exercises: [
                        {
                            exercise,
                            reps,
                            sets,
                            weight,
                        },
                    ],
                })
                .eq("id", workoutId);
            if (error) {
                console.error(error);
                throw error;
            } else {
                setEditMode(false);
                setStatusMessage('"Success: Workout Updated!"');
            }
        } catch (error: any) {
            setErrorMessage(`Error: ${error.message.toString()}`);
        }
    };
    return (
        <div className="max-w-screen-sm mx-auto px-4 py-10">
            {errorMessage ? (
                <div className="mb-10 p-4 rounded-md shadow-md bg-light-grey">
                    <p className="text-red-600">{statusMessage}</p>
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            ) : (
                <div>
                    <div
                        className="flex flex-col items-center p-8 rounded-md shadow-md
      bg-light-grey relative"
                    >
                        {user ? (
                            <div className="flex absolute left-2 top-2 gap-x-2">
                                <div
                                    className="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
        bg-red-600 shadow-lg"
                                    onClick={() => setEditMode(true)}
                                >
                                    <img
                                        className="h-3.5 w-auto"
                                        src={require("../assets/images/pencil-light.png")}
                                        alt=""
                                    />
                                </div>
                                <div
                                    onClick={() => deleteWorkout()}
                                    className="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
                        bg-red-600 shadow-lg"
                                >
                                    <img
                                        className="h-3.5 w-auto"
                                        src={require("../assets/images/trash-light.png")}
                                        alt=""
                                    />
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                        {workoutType === "cardio" ? (
                            <img
                                className="h-24 w-auto"
                                src={require("../assets/images/running-light.png")}
                                alt=""
                            />
                        ) : (
                            <img
                                className="h-24 w-auto"
                                src={require("../assets/images/dumbbell-light.png")}
                                alt=""
                            />
                        )}
                        <span
                            className="mt-6 py-1.5 px-5 text-xs text-white bg-red-600
        rounded-lg shadow-md"
                        >
              {workoutType}
            </span>
                        {editMode ? (
                            <div className="w-full mt-6">
                                <input
                                    type="text"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    value={workoutName}
                                    onChange={(e: any) => setWorkoutName(e.target.value)}
                                    placeholder="Workout Name Here"
                                />
                            </div>
                        ) : (
                            <div className="w-full mt-6">
                                <h1 className="text-red-600 text-2xl text-center">
                                    {workoutName}
                                </h1>
                            </div>
                        )}
                    </div>

                    <div
                        className="mt-10 p-8 rounded-md flex flex-col item-center
      bg-light-grey shadow-md"
                    >
                        {workoutType === "strength" ? (
                            <div className="flex flex-col gap-y-4 w-full">
                                <div
                                    className="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
                                    //    data.map exercises => exercises.exercise
                                >
                                    <div className="flex flex-2 flex-col md:w-1/3">
                                        <label
                                            htmlFor="exercise-name"
                                            className="mb-1 text-sm text-red-600"
                                        >
                                            Exercise
                                        </label>
                                        {editMode ? (
                                            <input
                                                id="exercise-name"
                                                className="p-2 w-full text-gray-500 focus:outline-none"
                                                type="text"
                                                value={exercise}
                                                onChange={(e: any) => setExercise(e.target.value)}
                                            />
                                        ) : (
                                            <p>{exercise}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <label htmlFor="sets" className="mb-1 text-sm text-red-600">
                                            Sets
                                        </label>
                                        {editMode ? (
                                            <input
                                                id="sets"
                                                className="p-2 w-full text-gray-500 focus:outline-none"
                                                type="text"
                                                value={sets}
                                                onChange={(e: any) => setSets(e.target.value)}
                                            />
                                        ) : (
                                            <p>{sets}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <label htmlFor="reps" className="mb-1 text-sm text-red-600">
                                            Reps
                                        </label>

                                        {editMode ? (
                                            <input
                                                id="reps"
                                                className="p-2 w-full text-gray-500 focus:outline-none"
                                                type="text"
                                                value={reps}
                                                onChange={(e: any) => setReps(e.target.value)}
                                            />
                                        ) : (
                                            <p>{reps}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <label
                                            htmlFor="weight"
                                            className="mb-1 text-sm text-red-600"
                                        >
                                            Weight (Kg's)
                                        </label>

                                        {editMode ? (
                                            <input
                                                id="weight"
                                                className="p-2 w-full text-gray-500 focus:outline-none"
                                                type="text"
                                                value={weight}
                                                onChange={(e: any) => setWeight(e.target.value)}
                                            />
                                        ) : (
                                            <p>{weight}</p>
                                        )}
                                    </div>

                                    {editMode ? (
                                        <img
                                            onClick={() => deleteExercise(getId)}
                                            className="absolute h-4 w-auto -left-5 cursor-pointer"
                                            src={require("../assets/images/trash-light.png")}
                                            alt=""
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                {editMode ? (
                                    <button
                                        onClick={() => addExercise()}
                                        type="button"
                                        className="py-2 px-6 rounded-sm self-start text-sm text-white
        bg-red-600 duration-200 border-solid border-2 border-transparent
        hover:border-red-600 hover:bg-white hover:text-red-600"
                                    >
                                        Add Exercise
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-y-4 w-full">
                                <div
                                    className="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
                                    // data.map exercises => exercises.cardioType
                                >
                                    <div className="flex flex-2 flex-col md:w-1/3">
                                        <label
                                            htmlFor="cardioType"
                                            className="mb-1 text-sm text-red-600"
                                        >
                                            Type
                                        </label>

                                        {editMode ? (
                                            <select
                                                id="cardioType"
                                                className="p-2 w-full text-gray-500 focus:outline-none"
                                                value={cardioType}
                                                onChange={(e: any) => setCardioType(e.target.value)}
                                            >
                                                <option value="#">Select Type</option>
                                                <option value="run">Runs</option>
                                                <option value="walk">Walk</option>
                                            </select>
                                        ) : (
                                            <p>{cardioType}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <label
                                            htmlFor="distance"
                                            className="mb-1 text-sm text-red-600"
                                        >
                                            Distance
                                        </label>
                                        {editMode ? (
                                            <input
                                                id="distance"
                                                className="p-2 w-full text-gray-500 focus:outline-none"
                                                type="text"
                                                value={distance}
                                                onChange={(e: any) => setDistance(e.target.value)}
                                            />
                                        ) : (
                                            <p>{distance}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <label
                                            htmlFor="duration"
                                            className="mb-1 text-sm text-red-600"
                                        >
                                            Duration
                                        </label>
                                        {editMode ? (
                                            <input
                                                id="duration"
                                                className="p-2 w-full text-gray-500 focus:outline-none"
                                                type="text"
                                                value={duration}
                                                onChange={(e: any) => setDuration(e.target.value)}
                                            />
                                        ) : (
                                            <p>{duration}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col">
                                        <label htmlFor="pace" className="mb-1 text-sm text-red-600">
                                            Pace
                                        </label>
                                        {editMode ? (
                                            <input
                                                id="pace"
                                                className="p-2 w-full text-gray-500 focus:outline-none"
                                                type="text"
                                                value={pace}
                                                onChange={(e: any) => setPace(e.target.value)}
                                            />
                                        ) : (
                                            <p>{pace}</p>
                                        )}
                                    </div>
                                    {editMode ? (
                                        <img
                                            onClick={() => deleteExercise(getId)}
                                            className="absolute h-4 w-auto -left-5 cursor-pointer"
                                            src={require("../assets/images/trash-light.png")}
                                            alt=""
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                {editMode ? (
                                    <button
                                        onClick={() => addExercise()}
                                        type="button"
                                        className="py-2 px-6 rounded-sm self-start text-sm text-white
                        bg-red-600 duration-200 border-solid border-2 border-transparent
                        hover:border-red-600  hover:bg-white hover:text-red-600"
                                    >
                                        Add Exercise
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </div>
                        )}
                    </div>
                    {editMode ? (
                        <button
                            onClick={() => update()}
                            type="button"
                            className="mt-10 py-2 px-6 rounded-sm self-start text-sm text-white
    bg-red-600 duration-200 border-solid border-2 border-transparent
    hover:border-red-600 hover:bg-white hover:text-red-600"
                        >
                            Update Workout
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewWorkout;
