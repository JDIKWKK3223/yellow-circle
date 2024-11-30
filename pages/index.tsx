'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<number[]>([]);

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

      // Calculate column widths based on the longest content in each column
      const maxWidths = headerRow.map((_, colIndex) => {
        let maxWidth = headerRow[colIndex].length; // Start with header length
        dataRows.forEach((row) => {
          maxWidth = Math.max(maxWidth, row[colIndex].length);
        });
        return maxWidth * 10; // Adjust the multiplier to get the desired column width
      });
      setColumnWidths(maxWidths);
    };

    fetchData();
  }, []);

  // Adjust column widths after table data is loaded
  const adjustColumnWidths = () => {
    const table = document.getElementById('productTable') as HTMLTableElement;
    const rows = table.rows;
    const cellWidths = Array.from(rows[0].cells).map((_, colIndex) => {
      let maxWidth = 0;
      Array.from(rows).forEach(row => {
        const cell = row.cells[colIndex];
        const cellWidth = cell.scrollWidth;
        maxWidth = Math.max(maxWidth, cellWidth);
      });
      return maxWidth + 20; // Adding some padding for visual clarity
    });
    setColumnWidths(cellWidths);
  };

  useEffect(() => {
    // Adjust column widths once data is loaded
    if (data.length > 0) {
      adjustColumnWidths();
    }
  }, [data]);

  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Product Data
      </h1>
      <div style={{ overflowX: 'auto' }}>
        <table id="productTable" style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
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
                    minWidth: `${columnWidths[index]}px`, // Dynamic width based on content
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
                      minWidth: `${columnWidths[cellIndex]}px`, // Dynamic width based on content
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
