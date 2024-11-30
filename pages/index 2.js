"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Home = () => {
    const [data, setData] = (0, react_1.useState)([]);
    const [headers, setHeaders] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            // Fetch the CSV file from the public/data directory
            const response = yield fetch('/data/products.csv');
            const text = yield response.text();
            // Split the CSV into rows
            const rows = text.split('\n');
            // Get the headers (first row)
            const headerRow = rows[0].split(',');
            // Set headers and data (skipping the first row for data)
            setHeaders(headerRow);
            const dataRows = rows.slice(1).map(row => row.split(','));
            setData(dataRows);
        });
        fetchData();
    }, []);
    return (<div>
      <h1>Product Data</h1>
      
      {/* Display the table */}
      <table>
        <thead>
          <tr>
            {/* Dynamically render table headers from CSV */}
            {headers.map((header, index) => (<th key={index}>{header}</th>))}
          </tr>
        </thead>
        <tbody>
          {/* Dynamically render rows from CSV */}
          {data.map((row, rowIndex) => (<tr key={rowIndex}>
              {row.map((cell, cellIndex) => (<td key={cellIndex}>{cell}</td>))}
            </tr>))}
        </tbody>
      </table>
    </div>);
};
exports.default = Home;
