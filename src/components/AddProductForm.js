import React, { Component } from 'react';
import axios from 'axios';
class AddProductForm extends Component {
    state = {
        title: '',
        category: '',
        price: '',
        employee: '',
        description: '',
        reviewArray: []
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

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products';
            await axios({ method: 'post', url: `${apiUrl}`, data: this.state });
            this.props.fetchData();

            this.setState({
                title: '',
                category: '',
                price: '',
                employee: '',
                description: '',
                reviewArray: []
            })
        } catch (error) {
            console.log(error)
        }
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
                        <input type="number"
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
        )
    }
}

export default AddProductForm;