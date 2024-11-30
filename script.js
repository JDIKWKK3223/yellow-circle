document.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('dynamic-table');
  const numRows = 30;
  const numColumns = 45;

  // Loop through to create rows
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < numColumns; j++) {
      const cell = document.createElement('td');
      // Leave the cell empty
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
});
