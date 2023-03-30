import {Database} from "./supabase";

export type Workout = Database["public"]["Tables"]["workouts"]["Row"]


