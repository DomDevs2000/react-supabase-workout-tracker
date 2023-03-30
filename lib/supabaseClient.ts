import {createClient} from '@supabase/supabase-js'
import {Database} from "../types/supabase";

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL
const supabaseKey: string = process.env.REACT_APP_SUPABASE_ANON_KEY

const supabase = createClient<Database>(
    supabaseUrl,
    supabaseKey
)