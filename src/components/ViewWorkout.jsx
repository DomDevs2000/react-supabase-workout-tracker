import React, {useEffect, useState} from 'react';
import supabase from "../supabase/supabaseClient";
import {uid} from "uid";
import {useNavigate} from "react-router-dom";

const ViewWorkout = () => {
    const navigate = useNavigate();

    const [dataLoaded, setDataLoaded] = useState(false);
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);
    // const [errorMsg, setErrorMsg] = useState([]);
    // const [statusMsg, setStatusMsg] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [exercise, setExercise] = useState('');
    const [workoutName, setWorkoutName] = useState('');
    const [workoutType, setWorkoutType] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [cardioType, setCardioType] = useState("");
    const [pace, setPace] = useState("");
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");


    // hard coded workout id
    const workoutId = 19;
    //

    useEffect(() => {
        return () => {
            async function getData() {
                try {
                    const {data: workouts, error} = await supabase
                        .from("workouts")
                        .select("*")
                        .eq("id", workoutId);
                    if (error) throw error;
                    data.value = workouts[0];
                    setDataLoaded(true);
                    console.log(data.value.exercises[0].exercise);

                    if (data.value.workoutType === 'strength') {
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
                } catch (error) {
                    // setErrorMsg(error.message[0]);
                    setTimeout(() => {
                        // setErrorMsg(false);
                    }, 5000);
                }
            }

            getData();
        };
    }, []);

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


    const getId = data.map((item, index) => (item.id));

    const addExercise = () => {
        if (workoutType === "strength") {
            data.value.exercises.push({
                id: uid(), exercise: exercise, sets: sets, reps: reps, weight: weight,
            });
            return;
        }
        data.value.exercises.push({
            id: uid(), cardioType: cardioType, distance: distance, duration: duration, pace: pace,
        });
    };
    // Delete exercise
    const deleteExercise = (id) => {
        if (data.value.exercises.length > 1) {
            data.value.exercises = data.value.exercises.filter((exercise) => exercise.id !== id);
            return;
        }
        // errorMsg.value = "Error: Cannot remove, need to at least have one exercise";
        setTimeout(() => {
            // errorMsg.value = false;
        }, 5000);
    };
    const deleteWorkout = async () => {
        try {
            const {error} = await supabase
                .from("workouts")
                .delete()
                .eq("id", workoutId);
            if (error) throw error;
            navigate('/');
        } catch (error) {
            // setErrorMsg(error.message);
            setTimeout(() => {
                // errorMsg.value = false;
            }, 5000);
        }
    };
    // Update Workout
    const update = async () => {
        try {
            const {error} = await supabase
                .from("workouts")
                .update({
                    workoutName: data.value.workoutName, exercises: [{
                        exercise: exercise,
                        reps: reps,
                        sets: sets,
                        weight: weight,

                    }],
                })
                .eq("id", workoutId);
            if (error) throw error;
            setEditMode(false);
            // setStatusMsg('"Success: Workout Updated!"');
            setTimeout(() => {
                // setStatusMsg('');
            }, 5000);
        } catch (error) {
            // setErrorMsg(`Error: ${error.message.toString()}`);
            setTimeout(() => {
                // errorMsg.value = false;
            }, 5000);
        }
    };
    return (<div className="max-w-screen-sm mx-auto px-4 py-10">

            {/*{errorMsg ?*/}
            <div

                className="mb-10 p-4 rounded-md shadow-md bg-light-grey"
            >
                <p className="text-red-600">
                    {/*{{statusMsg}}*/}
                </p>
                <p className="text-red-500">
                    {/*{{errorMsg}}*/}
                </p>
            </div>
            {/*:*/}

            <div>
                <div
                    className="flex flex-col items-center p-8 rounded-md shadow-md
      bg-light-grey relative"
                >
                    {user ? <div className="flex absolute left-2 top-2 gap-x-2">
                        <div
                            className="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
        bg-red-600 shadow-lg" onClick={() => setEditMode(true)}
                        >
                            <img className="h-3.5 w-auto" src={require('../assets/images/pencil-light.png')}
                                 alt=""/>
                        </div>
                        <div
                            onClick={() => deleteWorkout()}

                            className="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
                        bg-red-600 shadow-lg"
                        >
                            <img className="h-3.5 w-auto" src={require('../assets/images/trash-light.png')}
                                 alt=""/>
                        </div>
                    </div> : <></>}
                    {workoutType === 'cardio' ? <img
                        className="h-24 w-auto"
                        src={require('../assets/images/running-light.png')}
                        alt=""
                    /> : <img
                        className="h-24 w-auto"
                        src={require('../assets/images/dumbbell-light.png')}
                        alt=""
                    />}
                    <span className="mt-6 py-1.5 px-5 text-xs text-white bg-red-600
        rounded-lg shadow-md"
                    >
          {workoutType}
        </span>
                    {editMode ? <div className="w-full mt-6">
                            <input

                                type="text"
                                className="p-2 w-full text-gray-500 focus:outline-none"
                                value={workoutName}
                                onChange={(e) => setWorkoutName(e.target.value)}
                                placeholder="Workout Name Here"
                            />
                        </div> :

                        <div className="w-full mt-6">
                            <h1 className="text-red-600 text-2xl text-center">
                                {workoutName}
                            </h1>

                        </div>}


                </div>

                <div
                    className="mt-10 p-8 rounded-md flex flex-col item-center
      bg-light-grey shadow-md"
                >

                    {workoutType === 'strength' ? <div className="flex flex-col gap-y-4 w-full">
                        <div
                            className="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
                            //    data.map exercises => exercises.exercise
                        >
                            <div className="flex flex-2 flex-col md:w-1/3">
                                <label htmlFor="exercise-name" className="mb-1 text-sm text-red-600">
                                    Exercise
                                </label>
                                {editMode ? <input
                                    id="exercise-name"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    type="text"
                                    value={exercise}
                                    onChange={(e) => setExercise(e.target.value)}
                                /> : <p>
                                    {exercise}
                                </p>}
                            </div>
                            <div className="flex flex-1 flex-col">
                                <label htmlFor="sets" className="mb-1 text-sm text-red-600">
                                    Sets
                                </label>
                                {editMode ? <input
                                    id="sets"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    type="text"
                                    value={sets}
                                    onChange={(e) => setSets(e.target.value)}
                                /> : <p>
                                    {sets}
                                </p>}
                            </div>
                            <div className="flex flex-1 flex-col">
                                <label htmlFor="reps" className="mb-1 text-sm text-red-600">
                                    Reps
                                </label>

                                {editMode ? <input
                                    id="reps"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    type="text"
                                    value={reps}
                                    onChange={(e) => setReps(e.target.value)}
                                /> : <p>
                                    {reps}
                                </p>}
                            </div>
                            <div className="flex flex-1 flex-col">
                                <label htmlFor="weight" className="mb-1 text-sm text-red-600">
                                    Weight (Kg's)
                                </label>

                                {editMode ? <input
                                    id="weight"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    type="text"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                /> : <p>
                                    {weight}
                                </p>}
                            </div>

                            {editMode ? <img

                                onClick={() => deleteExercise(getId)}

                                className="absolute h-4 w-auto -left-5 cursor-pointer"
                                src={require('../assets/images/trash-light.png')}
                                alt=""
                            /> : <></>}
                        </div>
                        {editMode ? <button

                            onClick={() => addExercise()}

                            type="button"
                            className="py-2 px-6 rounded-sm self-start text-sm text-white
        bg-red-600 duration-200 border-solid border-2 border-transparent
        hover:border-red-600 hover:bg-white hover:text-red-600"
                        >
                            Add Exercise
                        </button> : <></>}
                    </div> : <div className="flex flex-col gap-y-4 w-full">
                        <div
                            className="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
                            // data.map exercises => exercises.cardioType
                        >
                            <div className="flex flex-2 flex-col md:w-1/3">
                                <label htmlFor="cardioType" className="mb-1 text-sm text-red-600">
                                    Type
                                </label>

                                {editMode ? <select
                                    id="cardioType"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    value={cardioType}
                                    onChange={(e) => setCardioType(e.target.value)}
                                >
                                    <option value="#">Select Type</option>
                                    <option value="run">Runs</option>
                                    <option value="walk">Walk</option>
                                </select> : <p>
                                    {cardioType}
                                </p>}
                            </div>
                            <div className="flex flex-1 flex-col">
                                <label htmlFor="distance" className="mb-1 text-sm text-red-600">
                                    Distance
                                </label>
                                {editMode ? <input
                                    id="distance"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    type="text"
                                    value={distance}
                                    onChange={(e) => setDistance(e.target.value)}
                                /> : <p>
                                    {distance}
                                </p>}
                            </div>
                            <div className="flex flex-1 flex-col">
                                <label htmlFor="duration" className="mb-1 text-sm text-red-600">
                                    Duration
                                </label>
                                {editMode ? <input
                                    id="duration"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    type="text"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                /> : <p>
                                    {duration}
                                </p>}
                            </div>
                            <div className="flex flex-1 flex-col">
                                <label htmlFor="pace" className="mb-1 text-sm text-red-600">
                                    Pace
                                </label>
                                {editMode ? <input

                                    id="pace"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    type="text"
                                    value={pace}
                                    onChange={(e) => setPace(e.target.value)}
                                /> : <p>
                                    {pace}
                                </p>}
                            </div>
                            {editMode ? <img
                                onClick={() => deleteExercise(getId)}
                                className="absolute h-4 w-auto -left-5 cursor-pointer"
                                src={require('../assets/images/trash-light.png')}
                                alt=""
                            /> : <></>}
                        </div>
                        {editMode ? <button
                            onClick={() => addExercise()}
                            type="button"
                            className="py-2 px-6 rounded-sm self-start text-sm text-white
                        bg-red-600 duration-200 border-solid border-2 border-transparent
                        hover:border-red-600  hover:bg-white hover:text-red-600"
                        >
                            Add Exercise
                        </button> : <></>}
                    </div>}
                </div>
                {editMode ? <button

                    onClick={() => update()}
                    type="button"
                    className="mt-10 py-2 px-6 rounded-sm self-start text-sm text-white
    bg-red-600 duration-200 border-solid border-2 border-transparent
    hover:border-red-600 hover:bg-white hover:text-red-600"
                >
                    Update Workout
                </button> : <></>}
            </div>


        </div>

    );

};

export default ViewWorkout;