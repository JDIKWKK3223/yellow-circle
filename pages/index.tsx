'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rowHeights, setRowHeights] = useState<number[]>([]);

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

      // Dynamically calculate row heights based on content
      const heights = dataRows.map((row) => {
        const rowText = row.join(' '); // Join all cell content in a row into a single string
        return rowText.length > 0 ? 30 : 20; // Set height based on content length (adjust as needed)
      });
      setRowHeights(heights);
    };

    fetchData();
  }, []);

  // Function to dynamically adjust row heights
  useEffect(() => {
    const table = document.getElementById('productTable');
    if (table) {
      const rows = table.getElementsByTagName('tr');
      const newRowHeights = Array.from(rows).map((row) => {
        return row.scrollHeight;
      });
      setRowHeights(newRowHeights);
    }
  }, [data]);

  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Product Data
      </h1>
      <div style={{ overflowX: 'auto' }}>
        <table id="productTable" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#f0f0f0' }}>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  style={{
                    padding: '8px',
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    borderBottom: '2px solid rgba(0, 0, 0, 0.5)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minWidth: '150px', // Ensure there's enough space for text (adjust based on content)
                    height: '30px', // Fixed height for header
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
                  height: rowHeights[rowIndex] ? `${rowHeights[rowIndex]}px` : '30px', // Dynamically set row height
                }}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{
                      borderTop: '1px solid rgba(0, 0, 0, 0.5)', // Inside borders only
                      padding: '8px',
                      textAlign: 'left',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      minWidth: '150px', // Dynamic width based on content
                      height: '30px', // Force fixed height for each cell
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
