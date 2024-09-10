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

// === Add new Data ===
app.post('/', (req, res) => {
  const { first_name, last_name, email, gender } = req.body;
  const newUser = { id: randomUUID(), first_name, last_name, email, gender };
  jsonData.push(newUser);

  fs.writeFileSync('./data.json', JSON.stringify(jsonData));
  res.status(201).json({ message: 'New Data Created Successfully' });
});

// === Update Data ===
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = jsonData.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  jsonData[userIndex] = { ...jsonData[userIndex], ...req.body };
  fs.writeFileSync('./data.json', JSON.stringify(jsonData));
  res.status(200).json({ message: 'Data Updated Successfully' });
});


const PORT = 4000;
app.listen(PORT, () => console.log(`App listen on port ${PORT}`));
