"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser")); // Install this package via npm
function handler(req, res) {
    const results = [];
    const csvFilePath = path_1.default.resolve('public/data/products.csv'); // Make sure the CSV file is in public/data/
    fs_1.default.createReadStream(csvFilePath)
        .pipe((0, csv_parser_1.default)()) // Parses the CSV file
        .on('data', (data) => results.push(data)) // Collect the rows
        .on('end', () => {
        res.status(200).json(results); // Send the parsed data as a JSON response
    })
        .on('error', (error) => {
        console.error(error);
        res.status(500).json({ error: 'Failed to read CSV file' });
    });
}
