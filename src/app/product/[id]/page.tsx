"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

const ProductDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState('');

  useEffect(() => {
    if (id) {
      fetchProduct(id as string);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        setUpdatedName(data.name);
        setUpdatedPrice(data.price.toString());
        setUpdatedQuantity(data.quantity.toString());
      } else {
        throw new Error('Failed to fetch product');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleUpdate = async () => {
    if (!product) return;
    const updatedProduct = {
      name: updatedName,
      price: parseFloat(updatedPrice),
      quantity: parseInt(updatedQuantity, 10),
    };

    try {
      const response = await fetch(`http://localhost:3001/api/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        fetchProduct(product._id);
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    try {
      const response = await fetch(`http://localhost:3001/api/products/${product._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/productlist');
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail-container">
      <h1 style={{ color: 'black' }}>Product Detail</h1>
      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
      <div className="product-detail">
        <h2 style={{ color: 'black' }}>{product.name}</h2>
        <p style={{ color: 'black' }}>Price: ${product.price}</p>
        <p style={{ color: 'black' }}>Quantity: {product.quantity}</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="update-form">
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          required
          style={{ color: 'black' }}
        />
        <input
          type="number"
          value={updatedPrice}
          onChange={(e) => setUpdatedPrice(e.target.value)}
          required
          style={{ color: 'black' }}
        />
        <input
          type="number"
          value={updatedQuantity}
          onChange={(e) => setUpdatedQuantity(e.target.value)}
          required
          style={{ color: 'black' }}
        />
        <button type="submit">Update</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
      <style jsx>{`
        .product-detail-container {
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
        .product-detail {
          margin-bottom: 1.5rem;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        .update-form {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }
        .update-form input {
          margin-bottom: 0.5rem;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          color: black;
        }
        .update-form button {
          margin-right: 0.5rem;
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

export default ProductDetail;
