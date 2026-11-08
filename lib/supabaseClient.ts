import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xtfhgdthsksnkxbppzjm.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Cwnnq5MM_rNZXdLLPLv_fA_CHFN5odC'

// Fallback di sicurezza se la stringa dovesse arrivare vuota o malformata
const validUrl = supabaseUrl.startsWith('http') 
  ? supabaseUrl 
  : 'https://xtfhgdthsksnkxbppzjm.supabase.co'

export const supabase = createClient(validUrl, supabaseAnonKey)