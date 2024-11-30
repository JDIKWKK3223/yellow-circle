// lib/getData.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function getData() {
  const { data, error } = await supabase
    .from('master')  // Replace with your table name
    .select('*');

  if (error) throw new Error(error.message);

  return data;
}

