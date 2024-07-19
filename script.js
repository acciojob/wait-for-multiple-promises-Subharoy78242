//your JS code here. If required.
// Function to generate a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(name) {
  return new Promise((resolve) => {
    const time = (Math.random() * 2 + 1).toFixed(3);
    setTimeout(() => resolve({ name, time: parseFloat(time) }), time * 1000);
  });
}

// Create three promises
const promises = [
  createRandomPromise('Promise 1'),
  createRandomPromise('Promise 2'),
  createRandomPromise('Promise 3'),
];

// Add loading row to the table
const output = document.getElementById('output');
const loadingRow = document.getElementById('loading');

// Wait for all promises to resolve
Promise.all(promises).then((results) => {
  // Remove the loading text
  if (loadingRow) {
    loadingRow.remove();
  }

  // Calculate total time
  const totalTime = results.reduce((sum, result) => sum + result.time, 0).toFixed(3);

  // Populate the table with results
  results.forEach((result) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const timeCell = document.createElement('td');
    nameCell.textContent = result.name;
    timeCell.textContent = result.time;
    row.appendChild(nameCell);
    row.appendChild(timeCell);
    output.appendChild(row);
  });

  // Add total time row
  const totalRow = document.createElement('tr');
  const totalNameCell = document.createElement('td');
  const totalTimeCell = document.createElement('td');
  totalNameCell.textContent = 'Total';
  totalTimeCell.textContent = totalTime;
  totalRow.appendChild(totalNameCell);
  totalRow.appendChild(totalTimeCell);
  output.appendChild(totalRow);
});