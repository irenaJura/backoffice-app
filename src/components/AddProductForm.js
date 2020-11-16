import React, { Component } from 'react';
import axios from 'axios';
class AddProductForm extends Component {
    state = {
        title: '',
        category: '',
        price: '',
        employee: '',
        description: '',
    }

    handleInputChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
        console.log(this.state)
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const apiUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products';
        axios({
            method: 'post',
            url: `${apiUrl}`,
            data: this.state
        })
            .then(() => this.props.fetchData())
            .catch((error) => console.log(error))

        this.setState({
            title: '',
            category: '',
            price: '',
            employee: '',
            description: '',
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                />
                <br />
                <label>Category</label>
                <input
                    type="text"
                    name="category"
                    value={this.state.category}
                    onChange={this.handleInputChange}
                />
                <br />
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={this.state.price}
                    onChange={this.handleInputChange}
                />
                <br />
                <label>Employee</label>
                <input
                    type="text"
                    name="employee"
                    value={this.state.employee}
                    onChange={this.handleInputChange}
                />
                <br />
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                />
                <br />
                <button type="submit">Add new product</button>
            </form>
        )
    }
}

export default AddProductForm;