<table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      {headers.map((header, index) => (
        <th
          key={index}
          style={{
            padding: '12px',
            textAlign: 'left',
            backgroundColor: '#f0f0f0',
            textTransform: 'uppercase',
            borderBottom: '2px solid rgba(0, 0, 0, 0.5)', // Bottom border for headers
          }}
        >
          {header}
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
            }}
          >
            {cell}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
