import {createClient} from '@supabase/supabase-js'
import {Database} from '../../types/supabase';

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
// const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

type supabase = {
    supabaseUrl: string
    supabaseAnonKey: string
}

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient<Database>(supabaseUrl as string, supabaseAnonKey as string);
export default supabase;