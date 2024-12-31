import { createClient } from '@supabase/supabase-js'
const supabaseKey = process.env.SUPABASE_KEY
const projectUrl = process.env.SUPABASE_URL
const supabase = createClient(projectUrl, supabaseKey)