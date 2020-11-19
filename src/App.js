import React, { Component } from 'react';
import List from './components/List';
import AddProductForm from './components/AddProductForm';
import Chart from './components/Chart';
import axios from 'axios';

class App extends Component {
  state = {
    products: null,
    loading: false,
    isError: false,
    storeName: ''
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.fetchData();
    this.fetchName();
  }

  fetchData = () => {
    const apiUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products';

    axios({ method: 'get', url: `${apiUrl}` })
      .then(response => {
        this.setState({
          products: response.data
        })
        //console.log(this.state.products)
      })
      .catch(error => {
        console.log(error);
        this.setState({ isError: true })
      })
      .finally(() => this.setState({
        loading: false
      }))
  }

  deleteProduct(id) {
    axios
      .delete(`http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products/${id}`)
      .then(() => {
        const products = this.state.products.filter(item => item.id !== id);
        this.setState({ products });
      })
  }

  fetchName = () => {
    const apiUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api/stores';

    axios({ method: 'get', url: `${apiUrl}` })
      .then(response => {
        // console.log(response.data[0].data.name)
        this.setState({
          storeName: response.data[0].data.name
        })
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
      <div className="container-fluid">
        <div className="name-container">
          <h1>{this.state.storeName}</h1>
        </div>
        <div className="chart-container">
          <Chart />
        </div>
        <div className="form-container bg-light text-dark">
          <AddProductForm fetchData={this.fetchData} />
        </div>
        <div className="product-container">
          {this.state.isError && <div className='title-container'>Something went wrong ...</div>}
          {this.state.loading ? (
            <div className='title-container'>Loading ...</div>
          ) : (
              <List products={this.state.products} deleteProduct={(id) => this.deleteProduct(id)} />
            )}
        </div>
      </div>
    )
  }
}

export default App;