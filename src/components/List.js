import React, { useState } from 'react';
import ListItem from './ListItem';

const List = ({ products, deleteProduct }) => {
    const [isPanel, setIsPanel] = useState(false);

    const toggleLayout = () => {
        setIsPanel(!isPanel);
    }

    if (!products || products.length === 0) return <p className='title-container'>No products, sorry</p>;
    return (
        <>
            <button className="btn btn-success toggle-button" onClick={toggleLayout}>Switch to {isPanel ? 'grid' : 'panel'} layout</button>
            <ul className="product-list">
                {products.map((product) => (
                    <div className="card bg-light text-dark" key={product.id} style={isPanel ? { width: "760px" } : { width: "18rem" }}>
                        <ListItem product={product} deleteProduct={deleteProduct} />
                    </div>
                ))}
            </ul>
        </>
    );
}

export default List;