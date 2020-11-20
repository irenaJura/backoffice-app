import React from 'react';

const ListItem = ({ product, deleteProduct }) => {
    return (
        <>
            <div className="card-body">
                <h5 className="card-title">Title: {product.data.title}</h5>
                <li className="list-group-item">Description: {product.data.description}</li>
                <li className="list-group-item">Price: {product.data.price}</li>
                <li className="list-group-item">Category: {product.data.category}</li>
                <li className="list-group-item">Employee: {product.data.employee}</li>
                {product.data.reviewArray && product.data.reviewArray != null
                    ? product.data.reviewArray
                        .filter(entry => entry.trim() !== '')
                        .map((review, index) => <li className="list-group-item" key={index}>Review: {review} </li>)
                    : ''}
            </div>
            <button className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteProduct(product.id) }}>Delete</button>
        </>
    );
}

export default ListItem;