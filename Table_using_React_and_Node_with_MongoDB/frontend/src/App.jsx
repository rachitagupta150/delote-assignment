import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/Table';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items');
      setItems(response.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!quantity || quantity <= 0) newErrors.quantity = 'Quantity must be a positive number';
    if (!price || price <= 0) newErrors.price = 'Price must be a positive number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newItem = {
      name,
      quantity,
      price,
    };

    try {
      if (editingItem) {
        const response = await axios.put(
          `http://localhost:5000/items/${editingItem._id}`,
          newItem
        );
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === editingItem._id ? response.data : item
          )
        );
        setEditingItem(null);
      } else {
        const response = await axios.post('http://localhost:5000/items', newItem);
        setItems((prevItems) => [...prevItems, response.data]);
      }
      // Clear form fields after submission
      setName('');
      setQuantity('');
      setPrice('');
      setErrors({});
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setName(item.name);
    setQuantity(item.quantity);
    setPrice(item.price);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const isFormValid = () => {
    // Return true if form is valid, false otherwise
    return name && quantity > 0 && price > 0;
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>{editingItem ? 'Edit Item' : 'Add New Item'}</h1>
        <form onSubmit={handleSubmit} className="item-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          {errors.quantity && <p className="error">{errors.quantity}</p>}
          
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <p className="error">{errors.price}</p>}
          
          <button type="submit" disabled={!isFormValid()}>
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
        </form>
      </div>
      <div className="table-container">
        <Table items={items} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
