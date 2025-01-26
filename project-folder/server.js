const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const upload = multer({ dest: path.join(__dirname, 'uploads') });

app.post('/upload', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No audio file uploaded.');
  }
  console.log(`Audio file saved as ${req.file.filename}`);
  res.send('Audio uploaded successfully.');
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
