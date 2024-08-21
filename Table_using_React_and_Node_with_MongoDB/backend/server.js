

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://rachitagupta:rachi123@cluster0.pcswu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  
});

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
});

const Item = mongoose.model('Item', itemSchema);

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Update an item by ID
app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Delete an item by ID
app.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/items', async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
  });


  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


