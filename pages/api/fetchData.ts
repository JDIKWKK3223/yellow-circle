import fs from 'fs';
import path from 'path';
import csv from 'csv-parser'; // Install this package via npm

export default function handler(req, res) {
  const results = [];
  const csvFilePath = path.resolve('public/data/products.csv'); // Make sure the CSV file is in public/data/

  fs.createReadStream(csvFilePath)
    .pipe(csv()) // Parses the CSV file
    .on('data', (data) => results.push(data)) // Collect the rows
    .on('end', () => {
      res.status(200).json(results); // Send the parsed data as a JSON response
    })
    .on('error', (error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to read CSV file' });
    });
}
