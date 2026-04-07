import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ybbmzykhejsupeeaggah.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInN1YmpleHQiOiInIn16eWtoZWpzdXBlZWFnZ2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MzU0MzMsImV4cCI6MjA5MTAxMTQzM30.YI7vYRitBUtK4FWIvSAl9pPV2bFEIVSGmQT09g-YLn0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
