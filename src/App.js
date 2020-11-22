import React, { Component } from 'react';
import List from './components/List';
import AddProductForm from './components/AddProductForm';
import Chart from './components/Chart';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    products: [],
    loading: false,
    isError: false,
    storeName: ''
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.fetchData();
    this.fetchName();
  }

  // fetching products and store name
  fetchData = async () => {
    try {
      const apiUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products';
      const response = await axios({ method: 'get', url: `${apiUrl}` });
      this.setState({ products: response.data });
    } catch {
      this.setState({ isError: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  fetchName = async () => {
    try {
      const apiUrl = 'http://us-central1-test-b7665.cloudfunctions.net/api/stores';
      const response = await axios({ method: 'get', url: `${apiUrl}` });
      this.setState({ storeName: response.data[0].data.name });
    } catch {
      this.setState({ isError: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  // delete a single product
  deleteProduct = async (id) => {
    try {
      const apiUrl = `http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products/${id}`;
      await axios.delete(`${apiUrl}`);

      const products = this.state.products.filter(item => item.id !== id);
      this.setState({ products });
      toast.success('Product successfully deleted');
    } catch {
      toast.error('Failed to delete product, please try again');
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="form-group">
          <ToastContainer autoClose={2000} />
        </div>
        <div className="name-container">
          <h1>{this.state.storeName}</h1>
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
        <div className="chart-container">
          <Chart />
        </div>
      </div>
    )
  }
}

export default App;