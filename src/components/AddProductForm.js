import React, { useState } from 'react'

const AddProductForm = ({ addProduct }) => {
    const initialFormState = { title: '', category: '', price: '', employee: '', description: '' }
    const [product, setProduct] = useState(initialFormState)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setProduct({ ...product, [name]: value })
    }

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                if (!product.title || !product.category || !product.price || !product.employee || !product.description) return

                if (addProduct(product)) {
                    setProduct(initialFormState)
                    // fetch all products or call something that adds a product to your list
                }
                
            }}
        >
            <label>Title</label>
            <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleInputChange}
            />
            <br />
            <label>Category</label>
            <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleInputChange}
            />
            <br />
            <label>Price</label>
            <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
            />
            <br />
            <label>Employee</label>
            <input
                type="text"
                name="employee"
                value={product.employee}
                onChange={handleInputChange}
            />
            <br />
            <label>Description</label>
            <input
                type="text"
                name="description"
                value={product.description}
                onChange={handleInputChange}
            />
            <br />
            <button>Add new product</button>
        </form>
    )
}

export default AddProductForm;