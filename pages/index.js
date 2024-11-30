import { useEffect, useState } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the CSV file from the public/data directory
      const response = await fetch('/public/data/products.csv');
      const text = await response.text();
      
      // Split the CSV into rows
      const rows = text.split('\n');

      // Get the headers (first row)
      const headerRow = rows[0].split(',');

      // Set headers and data (skipping the first row for data)
      setHeaders(headerRow);
      const dataRows = rows.slice(1).map(row => row.split(','));
      setData(dataRows);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Product Data</h1>
      
      {/* Display the table */}
      <table>
        <thead>
          <tr>
            {/* Dynamically render table headers from CSV */}
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Dynamically render rows from CSV */}
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
