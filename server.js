const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors()); // Allow all origins to access the server
// Endpoint to save donation data to donor.json
app.post('/api/donate', (req, res) => {
  const donorFilePath = path.join(__dirname, 'public', 'donor.json');

  // Read the existing data from donor.json
  fs.readFile(donorFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading donor data.');

    const donations = data ? JSON.parse(data) : [];
    donations.push(req.body);

    // Write the updated data back to donor.json
    fs.writeFile(donorFilePath, JSON.stringify(donations, null, 2), (writeErr) => {
      if (writeErr) return res.status(500).send('Error saving donation data.');
      res.status(200).send('Donation saved successfully.');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:8080`);
});
