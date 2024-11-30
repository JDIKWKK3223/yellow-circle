document.addEventListener('DOMContentLoaded', () => {
  // Get the table element by its ID
  const table = document.getElementById('dynamic-table');

  // Number of rows and columns
  const numRows = 30;
  const numColumns = 45;

  // Loop through to create rows
  for (let i = 0; i < numRows; i++) {
    // Create a new row
    const row = document.createElement('tr');

    // Loop through to create columns
    for (let j = 0; j < numColumns; j++) {
      // Create a new cell
      const cell = document.createElement('td');
      
      // You can add custom text/content inside the cell if needed
      cell.textContent = `Row ${i + 1}, Col ${j + 1}`; // Optional: Just for demonstration
      
      // Append the cell to the row
      row.appendChild(cell);
    }

    // Append the row to the table
    table.appendChild(row);
  }
});
