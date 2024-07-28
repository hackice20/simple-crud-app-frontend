"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: productName,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    };

    try {
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        
        console.log('Product created successfully');
      } else {
       
        const errorData = await response.json();
        console.error('Failed to create product', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Simple-CRUD-App</h2>
      <h1>Add a New Product</h1>
      <nav className="nav-links">
        <Link href="/productlist" style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
          Product List
        </Link>
      </nav>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
        <Link href="/about" style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
          About
        </Link>
      </form>
      <style jsx>{`
        .form-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: black; /* Set header text color to black */
        }
        h1 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: black; /* Set header text color to black */
        }
        nav {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .nav-links a {
          display: block; /* Make links block elements */
          margin-bottom: 0.5rem; /* Add some space between links */
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          color: black; /* Set label text color to black */
        }
        input {
          width: calc(100% - 1rem);
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          color: black; /* Ensures text color is black */
        }
        button {
          display: block;
          width: 100%;
          padding: 0.75rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default ProductForm;
