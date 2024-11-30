'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any[]>([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fetchData'); // Call API endpoint
        const result = await response.json(); // Parse JSON response

        console.log('Fetched Data:', result); // Debug log for fetched data structure

        setData(result); // Save fetched data to state
      } catch (err: any) {
        console.error('Error fetching data:', err); // Log any errors
        setError(err.message); // Save error message to state
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch
      }
    }
    fetchData(); // Call fetchData function on component mount
  }, []); // Empty dependency array ensures this runs once on mount

  // Render loading state
  if (loading) return <p>Loading...</p>;

  // Render error state
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h1>Grocery Store Products</h1>
      {data.length > 0 ? (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              {/* Dynamically generate table headers */}
              {Object.keys(data[0]).map((key) => (
                <th
                  key={key}
                  style={{
                    border: '1px solid black',
                    padding: '8px',
                    backgroundColor: '#f2f2f2',
                    textAlign: 'left',
                  }}
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Dynamically generate table rows */}
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td
                    key={idx}
                    style={{
                      border: '1px solid black',
                      padding: '8px',
                      textAlign: 'left',
                    }}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
