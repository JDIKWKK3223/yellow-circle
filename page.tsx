'use client';  // Ensures this runs on the client-side

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/fetchData');
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Grocery Store Products</h1>
      <table>
        <thead>
          <tr>
            <th>ASIN</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Category</th>
            {/* Add more headers if your CSV contains more columns */}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                <td>{row.ASIN}</td>
                <td>{row.itemname}</td>
                <td>{row.price}</td>
                <td>{row.category}</td>
                {/* Adjust this depending on your CSV's structure */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
