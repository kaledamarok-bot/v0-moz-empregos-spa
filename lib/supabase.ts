import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ybbmzykhejsupeeaggah.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYm16eWtoZWpzdXBlZWFnZ2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MzgxMzcsImV4cCI6MjA5MTAxNDEzN30.YI7vYRitBUtK4FWIvSAl9pPV2bFEIVSGmQT09g-YLn0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
