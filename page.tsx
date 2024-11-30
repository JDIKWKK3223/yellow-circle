'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any[]>([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fetchData'); // Fetch data from API
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json(); // Parse JSON response
        setData(result); // Save data to state
      } catch (err: any) {
        setError(err.message); // Save error to state
      } finally {
        setLoading(false); // End loading state
      }
    }
    fetchData(); // Call fetchData on mount
  }, []);

  // Show loading or error messages if necessary
  if (loading) return <p className="bg-yellow-200 p-4">Loading...</p>; // Test Tailwind class
  if (error) return <p className="bg-red-500 text-white p-4">Error: {error}</p>; // Test Tailwind class

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold bg-blue-500 text-white p-4 mb-4">
        Grocery Store Products (Tailwind Test)
      </h1>
      {data.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-200">
              {Object.keys(data[0]).map((key) => (
                <th
                  key={key}
                  className="border border-gray-400 px-4 py-2 text-left"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td
                    key={idx}
                    className="border border-gray-400 px-4 py-2 text-left"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="bg-gray-100 p-4">No data available</p>
      )}
    </div>
  );
}
