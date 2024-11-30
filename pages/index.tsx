'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<string[][]>([]); // Stores rows of data from the CSV
  const [headers, setHeaders] = useState<string[]>([]); // Stores the headers from the CSV
  const [error, setError] = useState<string | null>(null); // Error handling state

  // Fetch and parse the CSV data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/products.csv');
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV: ${response.statusText}`);
        }

        const text = await response.text();
        const rows = text.split('\n').filter(row => row.trim() !== ''); // Filter out empty rows
        const headerRow = rows[0].split(','); // Extract headers from the first row
        const dataRows = rows.slice(1).map(row => row.split(',')); // Extract data rows

        setHeaders(headerRow);
        setData(dataRows);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Render loading, error, or table
  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
  }

  if (data.length === 0) {
    return <p style={{ textAlign: 'center', padding: '16px' }}>Loading data...</p>;
  }

  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Product Data
      </h1>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={{ border: '1px solid black', padding: '8px' }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
