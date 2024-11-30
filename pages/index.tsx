'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  // Fetch CSV data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/products.csv');
      const text = await response.text();
      const rows = text.split('\n').filter((row) => row.trim() !== '');
      const headerRow = rows[0].split(',');
      const dataRows = rows.slice(1).map((row) => row.split(','));
      setHeaders(headerRow);
      setData(dataRows);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Product Data
      </h1>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#f0f0f0' }}>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    borderBottom: '2px solid rgba(0, 0, 0, 0.5)',
                    whiteSpace: 'nowrap', // Prevent word wrap for headers
                    overflow: 'hidden', // Hide overflowed content
                    textOverflow: 'ellipsis', // Show ellipsis if content overflows
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0)',
                }}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{
                      borderTop: '1px solid rgba(0, 0, 0, 0.5)', // Inside borders only
                      padding: '8px',
                      textAlign: 'left',
                      whiteSpace: 'nowrap', // Prevent word wrap for cells
                      overflow: 'hidden', // Hide overflowed content
                      textOverflow: 'ellipsis', // Show ellipsis if content overflows
                      minWidth: '150px', // Ensure minimum width for cells
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
