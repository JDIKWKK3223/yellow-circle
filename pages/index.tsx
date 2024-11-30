'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [data, setData] = useState<any[]>([
    ['B001', 'Banana', '$0.99', 'Fruit'],
    ['A003', 'Apple', '$1.20', 'Fruit'],
    ['C002', 'Carrot', '$0.80', 'Vegetable'],
    ['D004', 'Date', '$3.00', 'Fruit'],
  ]);
  const [headers, setHeaders] = useState<string[]>(['ASIN', 'Item Name', 'Price', 'Category']);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'ASIN',
    direction: 'asc',
  });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    const sortedData = [...data].sort((a, b) => {
      const aValue = a[headers.indexOf(key)];
      const bValue = b[headers.indexOf(key)];

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Product Data
      </h1>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f0f0f0' }}>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(header)}
                  style={{
                    padding: '8px',
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    borderBottom: '2px solid rgba(0, 0, 0, 0.5)',
                    cursor: 'pointer',
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} style={{ borderTop: '1px solid rgba(0, 0, 0, 0.5)', padding: '8px' }}>
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
