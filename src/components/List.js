import React from 'react';

const List = ({ products, deleteProduct }) => {
    if (!products || products.length === 0) return <p className='title-container'>No products, sorry</p>;
    return (
        <ul className="product-list">
            {products.map((product) => (
                <li key={product.id} className="product-card">
                    <p>Title: {product.data.title}</p>
                    <p>Description: {product.data.description}</p>
                    <p>Price: {product.data.price}</p>
                    <p>Category: {product.data.category}</p>
                    <p>Employee: {product.data.employee}</p>
                    <button onClick={() => deleteProduct(product.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default List;