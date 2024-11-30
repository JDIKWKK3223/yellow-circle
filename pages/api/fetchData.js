
// pages/api/fetchData.js
import { getData } from '../../lib/getData';

export default async function handler(req, res) {
  try {
    const data = await getData();
    res.status(200).json(data);  // Return the data as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
