import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch all data from the 'master' table
    const { data, error } = await supabase
      .from('master') // Use your table name here
      .select('*'); // Fetch all columns dynamically

    if (error) {
      // Return an error response if the query fails
      return res.status(500).json({ error: error.message });
    }

    // Return the fetched data as JSON
    return res.status(200).json(data);
  } catch (err) {
    // Catch any unexpected errors
    return res.status(500).json({ error: 'Unexpected error occurred' });
  }
}
