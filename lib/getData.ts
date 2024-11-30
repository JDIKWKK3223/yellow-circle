import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function fetchData() {
  const { data, error } = await supabase
    .from('master') // Assuming 'master' is your table
    .select('*');

  console.log(data);  // Log the raw data before trying to parse it
  if (error) {
    console.error("Error fetching data:", error);
  }
  return data;
}
