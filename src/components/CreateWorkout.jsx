import React, {useState} from 'react';
import {uid} from 'uid';
import supabase from '../supabase/supabaseClient';

const CreateWorkout = () => {
    const [workoutName, setWorkoutName] = useState("");
    const [workoutType, setWorkoutType] = useState("select-workout");
    const [exercises, setExercises] = useState([]);
    const [exercise, setExercise] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [cardioType, setCardioType] = useState("");
    const [pace, setPace] = useState("");
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [userId, setUserId] = useState("");


    const errorMsg = [];
    const statusMsg = [];


    // add exercises
    const addExercise = () => {
        if (workoutType === "strength") {
            setExercises(exercises => [
                {
                    id: uid(),
                    exercise: exercise,
                    sets: sets,
                    reps: reps,
                    weight: weight,
                }
            ]
            )
            console.log('added strength')
            console.log(exercises)
        } else {
            setExercises(exercises => [{
                cardioType: cardioType,
                id: uid(),
                duration: duration,
                pace: pace,
                distance: distance,
            }]
            );
            console.log('added cardio');
        }
    };


//delete exercises
const deleteExercise = (id) => {
    if (exercises.length > 1) {
        exercises.value = exercises.value.filter((exercise) => exercise.id !== id);
        return;
    }
    errorMsg.value = "Error: Cannot remove, need to at least have one exercise";
    setTimeout(() => {
        errorMsg.value = false;
    }, 5000);
};

//get exercise id
const getId = exercises.map((item, index) => (
    item.id));

async function getUserId() {
    await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
            setUserId(value.data.user.id);
        }
    });
}

getUserId();
// create workout
const createWorkout = async () => {
    try {
        const {error} = await supabase.from("workouts").insert([
            {
                userId: userId,
                workoutName: workoutName,
                workoutType: workoutType,
                exercises: exercises,
            },
        ]);
        if (error) throw error;
        statusMsg.value = "Success: Workout Created!";
        workoutName.value = null;
        workoutType.value = "select-workout";
        exercises.value = [];
        setTimeout(() => {
            statusMsg.value = false;
        }, 5000);
    } catch (error) {
        errorMsg.value = `Error: ${error.message}`;
        setTimeout(() => {
            errorMsg.value = false;
        }, 5000);
    }
};

// workout change

const workoutChange = () => {
    exercises.value = [];
    addExercise();
};
return (
    <div className="max-w-screen-md mx-auto px-4 py-10">
        {/*{!statusMsg ?*/}
        {/*<div*/}

        {/*    className="mb-10 p-4 bg-light-grey rounded-md shadow-lg"*/}
        {/*>*/}
        {/*    <p className="text-at-light-green">*/}
        {/*        {{ statusMsg }}*/}
        {/*    </p>*/}
        {/*    <p className="text-red-500">{{ errorMsg }}</p>*/}
        {/*</div>*/}
        {/*    : <div></div>}*/}

        <div className="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
            <form onSubmit={createWorkout}
                  className="flex flex-col gap-y-5 w-full">
                <h1 className="text-2xl text-red-600">Record Workout</h1>

                <div className="flex flex-col">
                    <label htmlFor="workout-name" className="mb-1 text-sm text-red-600"
                    >Workout Name</label
                    >
                    <input
                        type="text"
                        required
                        className="p-2 text-gray-500 focus:outline-none"
                        id="workout-name"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="workout-type" className="mb-1 text-sm text-red-600"
                    >Workout Type</label
                    >
                    <select
                        id="workout-type"
                        className="p-2 text-gray-500 focus:outline-none"
                        required
                        onChange={(e) => setWorkoutType(e.target.value)}
                        value={workoutType}
                    >
                        <option value="select-workout">Select Workout</option>
                        <option value="strength">Strength Training</option>
                        <option value="cardio">Cardio</option>
                    </select>
                </div>
                {/*if workout type is strength */}
                {workoutType === 'strength' ?
                    <div className="flex flex-col gap-y-4">
                        <div
                            className="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
                            // value={exercises.map}
                        >
                            <div className="flex flex-col md:w-1/3">
                                <label htmlFor="exercise-name" className="mb-1 text-sm text-red-600"
                                >Exercise
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    value={exercise}
                                    onChange={(e) => setExercise(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="sets" className="mb-1 text-sm text-red-600">Sets </label>
                                <input
                                    required
                                    type="text"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    value={sets}
                                    onChange={(e) => setSets(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="reps" className="mb-1 text-sm text-red-600">Reps </label>
                                <input
                                    required
                                    type="text"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    value={reps}
                                    onChange={(e) => setReps(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="weight" className="mb-1 text-sm text-red-600"
                                >Weight (Kg's)
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            </div>
                            <img
                                onClick={() => deleteExercise(getId)}
                                src={require('../assets/images/trash-light.png')}
                                className="h-4 w-auto absolute -left-5 cursor-pointer"
                                alt=""
                            />
                        </div>
                        <button
                            onClick={() => addExercise()}
                            type="button"
                            className="mt-6 py-2 px-6 rounded-sm self-start text-sm
     text-white bg-red-600 duration-200 border-solid
     border-2 border-transparent hover:border-red-600 hover:bg-white
     hover:text-red-600"
                        >
                            Add Exercise
                        </button>
                    </div>
                    :
                    <div className="flex flex-col gap-y-4">
                        <div
                            className="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"


                        >
                            <div className="flex flex-col md:w-1/3">
                                <label htmlFor="cardio-type" className="mb-1 text-sm text-red-600"
                                >Type
                                </label>
                                <select
                                    id="cardio-type"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    value={cardioType}
                                    onChange={(e) => setCardioType(e.target.value)}
                                >
                                    <option value="#">Select Type</option>
                                    <option value="run">Runs</option>
                                    <option value="walk">Walk</option>
                                    <option value="walk">Cycle</option>
                                </select>
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="distance" className="mb-1 text-sm text-red-600"
                                >Distance (KM's)
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    value={distance}
                                    onChange={(e) => setDistance(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="duration" className="mb-1 text-sm text-red-600"
                                >Duration (Mins)
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <label htmlFor="pace" className="mb-1 text-sm text-red-600">Pace</label>
                                <input
                                    required
                                    type="text"
                                    className="p-2 w-full text-gray-500 focus:outline-none"
                                    value={pace}
                                    onChange={(e) => setPace(e.target.value)}
                                />
                            </div>
                            <img
                                onClick={() => deleteExercise(getId)}
                                src={require('../assets/images/trash-light.png')}
                                className="h-4 w-auto absolute-left-5 cursor-pointer"
                                alt=""
                            />
                        </div>
                        <button
                            onClick={() => addExercise}
                            type="button"
                            className="mt-6 py-2 px-6 rounded-sm self-start text-sm
            text-white bg-red-600 duration-200 border-solid
            border-2 border-transparent hover:border-red-600 hover:bg-white
            hover:text-red-600"
                        >
                            Add Exercise
                        </button>
                    </div>
                }
                <button
                    type="submit"
                    className="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-red-600 duration-200 border-solid
      border-2 border-transparent hover:border-red-600 hover:bg-white
      hover:text-red-600"
                >
                    Record Workout
                </button>
            </form>
        </div>
    </div>
);
};

export default CreateWorkout;