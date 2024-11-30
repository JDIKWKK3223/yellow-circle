'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<number[]>([]);

  const tableRef = useRef<HTMLTableElement | null>(null);
  const isResizing = useRef(false);
  const currentColumn = useRef<number | null>(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  // Sort state
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: '',
    direction: 'asc',
  });

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

      // Initialize column widths (based on header length)
      const initialWidths = headerRow.map((header) => header.length * 10);
      setColumnWidths(initialWidths);
    };

    fetchData();
  }, []);

  // Function to handle mouse down event (start resizing)
  const handleMouseDown = (index: number, e: React.MouseEvent) => {
    isResizing.current = true;
    currentColumn.current = index;
    startX.current = e.clientX;
    startWidth.current = tableRef.current?.rows[0].cells[index].offsetWidth || 0;
  };

  // Function to handle mouse move event (resize columns)
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || currentColumn.current === null) return;

    const newWidth = startWidth.current + (e.clientX - startX.current);
    const updatedWidths = [...columnWidths];
    updatedWidths[currentColumn.current] = newWidth;

    setColumnWidths(updatedWidths);
  };

  // Function to handle mouse up event (end resizing)
  const handleMouseUp = () => {
    isResizing.current = false;
  };

  // Add event listeners for mousemove and mouseup
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [columnWidths]);

  // Function to sort the table
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
        <table ref={tableRef} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#f0f0f0' }}>
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
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: `${columnWidths[index]}px`, // Set dynamic width
                    cursor: 'pointer', // Change cursor to pointer for sorting
                    position: 'relative',
                    backgroundColor: sortConfig.key === header ? '#e0e0e0' : '', // Highlight sorted column
                  }}
                >
                  {header}
                  {sortConfig.key === header ? (
                    <span style={{ marginLeft: '8px' }}>
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  ) : null}
                  <div
                    style={{
                      position: 'absolute',
                      right: '0',
                      top: '0',
                      bottom: '0',
                      width: '5px',
                      cursor: 'col-resize',
                      backgroundColor: '#ccc',
                    }}
                    onMouseDown={(e) => handleMouseDown(index, e)}
                  ></div>
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
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: `${columnWidths[cellIndex]}px`, // Dynamically adjust width
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
