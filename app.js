const express = require("express");

const { json } = require('express');
const fs = require('fs');
const server = express();

server.use(express.json());

server.get('/getAll', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.json(data);
});
server.get('/getById:id', (req, res) => {
  const id = req.params.id;
  const data = JSON.parse(fs.readFileSync('data.json'));
  const record = data.find(item => item.id === parseInt(id));
  res.json(record);
})
server.post('/add', (req, res) => {
  res.setHeader("Content-Type", "application/json")
  const newData = req.body;
  const data = JSON.parse(fs.readFileSync('data.json'));
  const existingData = data.findIndex(item => item.id === newData.id);
  if (existingData !== -1) {
    data[existingData] = newData;
  } else {

    data.push(newData);
  }

  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json({ message: 'Added successfully' });
})
server.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const data = JSON.parse(fs.readFileSync('data.json'));
  const index = data.findIndex(item => item.id === parseInt(id));

  if (index !== -1) {
    data[index] = updatedData;
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.json({ message: 'Updated successfully' });
  }
  else {
    res.status(404).json({ error: 'File not found' });
  }
})

server.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const data = JSON.parse(fs.readFileSync('data.json'));
  const updatedData = data.filter(item => item.id !== parseInt(id));
  fs.writeFileSync('data.json', JSON.stringify(updatedData));
  res.json({ message: 'Deleted successfully' });
})
// const PORT = process.env.PORT || 8080;
server.listen(8080, () => console.log("Sever listening at:8080"));
