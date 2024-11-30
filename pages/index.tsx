'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fetchData');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p style={{ backgroundColor: 'yellow', padding: '16px' }}>Loading...</p>;
  if (error) return <p style={{ backgroundColor: 'red', color: 'white', padding: '16px' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Grocery Store Products
      </h1>
      {data.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
          <thead>
            <tr>
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
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td
                    key={idx}
                    style={{
                      border: '1px solid black', // Add inside borders
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
        <p style={{ backgroundColor: '#f9f9f9', padding: '16px' }}>No data available</p>
      )}
    </div>
  );
}
