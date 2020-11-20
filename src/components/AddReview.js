import React, { Component } from 'react';

class AddReview extends Component {
    state = {
        value: '',
        reviews: []
    }

    handleInputChange = (e) => {
        this.setState({ value: e.target.value })
    }

    addReview = () => {
        this.setState((state) => {
            const reviews = [...state.reviews, state.value];

            return {
                reviews,
                value: '',
            };
        });
        console.log(this.state.value, this.state.reviews)
    }

    render() {
        return (
            <div>
                <input type="text" name="review" value={this.state.value} onChange={this.handleInputChange} />
                <button type="button" onClick={this.addReview}>Add a review</button>
            </div>
        );
    }
}

export default AddReview;