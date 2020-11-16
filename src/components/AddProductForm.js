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
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input type="text"
                            className="form-control"
                            placeholder="Title"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group col-md-6">
                        <input type="text"
                            className="form-control"
                            placeholder="Category"
                            name="category"
                            value={this.state.category}
                            onChange={this.handleInputChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input type="text"
                            className="form-control"
                            placeholder="Price"
                            name="price"
                            value={this.state.price}
                            onChange={this.handleInputChange} />
                    </div>

                    <div className="form-group col-md-6">
                        <input type="text"
                            className="form-control"
                            placeholder="Employee"
                            name="employee"
                            value={this.state.employee}
                            onChange={this.handleInputChange} />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-md-12">
                        <input type="text"
                            className="form-control"
                            placeholder="Description"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleInputChange} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Add new product</button>
            </form>
        )
    }
}

export default AddProductForm;