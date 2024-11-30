// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

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
      <h1>Product Data</h1>
      <table>
        <thead>
          <tr>
            <th>ASIN</th>
            <th>Item Name</th>
            <th>Category</th>
            {/* Add other headers as necessary */}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.ASIN}</td>
              <td>{row.itemname}</td>
              <td>{row.mbsbcategory}</td>
              {/* Add other columns as necessary */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

