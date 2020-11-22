import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class AddProductForm extends Component {
    state = {
        title: '',
        category: '',
        price: '',
        employee: '',
        description: '',
        reviewArray: [],
        errors: {}
    }

    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        if (!fields.title) {
            formIsValid = false;
            errors.title = "Cannot be empty";
        }

        if (!fields.title.match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            errors.title = "Only letters accepted";
        }

        if (!fields.category) {
            formIsValid = false;
            errors.category = "Cannot be empty";
        }

        if (typeof fields.category !== "undefined") {
            if (!fields.category.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors.category = "Only letters accepted";
            }
        }

        if (!fields.price) {
            formIsValid = false;
            errors.price = "Cannot be empty";
        }

        if (!fields.employee) {
            formIsValid = false;
            errors.employee = "Cannot be empty";
        }

        if (typeof fields.category !== "undefined") {
            if (!fields.category.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors.category = "Only letters accepted";
            }
        }

        if (!fields.description) {
            formIsValid = false;
            errors.description = "Cannot be empty";
        }

        if (typeof fields.category !== "undefined") {
            if (!fields.category.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors.category = "Only letters accepted";
            }
        }

        this.setState({ errors });
        return formIsValid;
    }

    handleInputChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleReviewChange = (e, index) => {
        const reviewArrayCopy = [...this.state.reviewArray];
        reviewArrayCopy[index] = e.target.value;
        this.setState({ reviewArray: reviewArrayCopy })
    }

    addReview = () => {
        this.setState({
            reviewArray: [...this.state.reviewArray, '']
        });
    }

    handleRemove = (index) => {
        this.state.reviewArray.splice(index, 1);
        this.setState({ reviewArray: this.state.reviewArray })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.handleValidation()) {
            this.doSubmit()
        }
    }

    doSubmit = async () => {
        try {
            const apiUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products';
            await axios({ method: 'post', url: `${apiUrl}`, data: this.state });
            toast.success('New product successfully added');

            this.props.fetchData();
            this.setState({ title: '', category: '', price: '', employee: '', description: '', reviewArray: [] });
        } catch (error) {
            toast.error('Failed to add new product, please try again');
        }
    }

    render() {
        return (
            <>
                <div className="form-group">
                    <ToastContainer autoClose={2000} />
                </div>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="text"
                                className="form-control"
                                placeholder="Title"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleInputChange} />
                            <span style={{ color: "red" }}>{this.state.errors.title}</span>
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text"
                                className="form-control"
                                placeholder="Category"
                                name="category"
                                value={this.state.category}
                                onChange={this.handleInputChange} />
                            <span style={{ color: "red" }}>{this.state.errors.category}</span>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="number"
                                className="form-control"
                                placeholder="Price"
                                name="price"
                                value={this.state.price}
                                onChange={this.handleInputChange} />
                            <span style={{ color: "red" }}>{this.state.errors.price}</span>
                        </div>

                        <div className="form-group col-md-6">
                            <input type="text"
                                className="form-control"
                                placeholder="Employee"
                                name="employee"
                                value={this.state.employee}
                                onChange={this.handleInputChange} />
                            <span style={{ color: "red" }}>{this.state.errors.employee}</span>
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
                            <span style={{ color: "red" }}>{this.state.errors.description}</span>
                        </div>
                    </div>

                    <button
                        className="btn btn-secondary mr-1"
                        type="button"
                        onClick={(e) => this.addReview(e)}
                    >
                        Add a review
                </button>
                    {this.state.reviewArray.map((review, index) => {
                        return (
                            <div key={index} className="row mt-3">
                                <div className="form-group col-md-10">
                                    <input
                                        className="form-control"
                                        placeholder="Review"
                                        value={review}
                                        onChange={(e) => this.handleReviewChange(e, index)}
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-danger" onClick={() => this.handleRemove(index)}>
                                        Remove
                                </button>
                                </div>
                            </div>
                        )
                    })}
                    <button type="submit" className="btn btn-primary ml-1">Add new product</button>
                </form>
            </>
        )
    }
}

export default AddProductForm;