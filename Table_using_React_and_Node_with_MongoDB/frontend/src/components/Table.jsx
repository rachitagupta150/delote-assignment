import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Table.css';

const Table = ({ items, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="item-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>
                <button className="edit" onClick={() => onEdit(item)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete" onClick={() => onDelete(item._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
