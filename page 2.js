"use strict";
'use client'; // Ensures this runs on the client-side
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
exports.default = Home;
const react_1 = require("react");
function Home() {
    const [data, setData] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        function fetchData() {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch('/api/fetchData');
                const result = yield response.json();
                setData(result);
            });
        }
        fetchData();
    }, []);
    return (<div>
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
          {data.length > 0 ? (data.map((row, index) => (<tr key={index}>
                <td>{row.ASIN}</td>
                <td>{row.itemname}</td>
                <td>{row.price}</td>
                <td>{row.category}</td>
                {/* Adjust this depending on your CSV's structure */}
              </tr>))) : (<tr>
              <td colSpan={4}>Loading...</td>
            </tr>)}
        </tbody>
      </table>
    </div>);
}
