import express from 'express';
import fs from 'fs';
import { randomUUID } from 'crypto';
const app = express();
app.use(express.json());

const jsonData = JSON.parse(fs.readFileSync('data.json'));

// === Get Data ==
app.get('/', (req, res) => {
  const data = fs.readFileSync('./data.json', 'utf-8');
  res.status(200).json(JSON.parse(data));
});

const PORT = 4000;
app.listen(PORT, () => console.log(`App listen on port ${PORT}`));
