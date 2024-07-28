"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="product-list-container">
      <h1 style={{ color: 'black' }}>Product List</h1>
      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
      <ul className="product-list">
        {products.map((product: Product) => (
          <li key={product._id} className="product-item">
            <h2 style={{ color: 'black' }}>{product.name}</h2>
            <p style={{ color: 'black' }}>Price: ${product.price}</p>
            <p style={{ color: 'black' }}>Quantity: {product.quantity}</p>
            <Link href={`/product/${product._id}`}>
              <button>View</button>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .product-list-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .error {
          color: red;
          text-align: center;
        }
        .product-list {
          list-style: none;
          padding: 0;
        }
        .product-item {
          margin-bottom: 1.5rem;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        button {
          margin-top: 0.5rem;
          padding: 0.5rem 1rem;
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

export default ProductList;
