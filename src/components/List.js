import React from 'react';

const List = ({ products, deleteProduct }) => {
    if (!products || products.length === 0) return <p className='title-container'>No products, sorry</p>;
    return (
        <ul className="product-list">
            {products.map((product) => (
                <div className="card bg-light text-dark" key={product.id} style={{ width: "18rem", textAlign: "center" }}>
                    <div className="card-body">
                        <h5 className="card-title">Title: {product.data.title}</h5>
                        <li className="list-group-item">Description: {product.data.description}</li>
                        <li className="list-group-item">Price: {product.data.price}</li>
                        <li className="list-group-item">Category: {product.data.category}</li>
                        <li className="list-group-item">Employee: {product.data.employee}</li>
                    </div>

                    <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>Delete</button>
                </div>
            ))}
        </ul>
    );
}

export default List;