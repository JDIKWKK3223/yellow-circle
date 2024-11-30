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
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h1>Grocery Store Products</h1>
      {data.length > 0 ? (
        <table
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            marginTop: '20px',
          }}
        >
          <thead>
            <tr>
              {/* Dynamically generate headers */}
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
            {/* Dynamically generate rows */}
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
