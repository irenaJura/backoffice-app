import React, { Component } from 'react';
import List from './components/List';
import AddProductForm from './components/AddProductForm';
import axios from 'axios';

class App extends Component {
  state = {
    products: null,
    loading: false,
    isError: false,
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.setState({ isError: false });
    this.fetchData();
  }

  fetchData = () => {
    const apiUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products';

    axios({ method: 'get', url: `${apiUrl}` })
      .then(response => {
        this.setState({
          products: response.data
        })
        console.log(this.state.products)
      })
      .catch(error => {
        console.log(error);
        this.setState({ isError: true })
      })
      .finally(() => this.setState({
        loading: false
      }))
  }

  render() {
    return (
      <div className="product-container">
        <AddProductForm fetchData={this.fetchData} />
        {this.state.isError && <div className='title-container'>Something went wrong ...</div>}
        {this.state.loading ? (
          <div className='title-container'>Loading ...</div>
        ) : (
            <List products={this.state.products} />
          )}
      </div>
    )
  }
}

export default App;