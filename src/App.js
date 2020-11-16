import React, { useState, useEffect } from 'react';
import List from './components/List';
import AddProductForm from './components/AddProductForm';
import axios from 'axios';

function App() {
  const [appState, setAppState] = useState({
    products: null,
    store: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function postData(url, data) {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // const resData = await response.json();
    // console.log(resData);
    // return resData;
  }

  function addProduct(product) {
    postData('http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products', product)
      // resolving promise for response data 
      .then((product) => setAppState({ ...appState.products, product }))
      // resolving promise for error 
      .catch(err => console.log(err));
  }

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const fetchData = async () => {
      try {
        await axios.all([
          axios.get('http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products'),
          axios.get('http://us-central1-test-b7665.cloudfunctions.net/api/stores'),
        ])
          .then(response => {
            const allProducts = response[0];
            const name = response[1].data[0].data.name;

            setAppState({ products: allProducts, store: name });
            console.log(appState.products);
          })
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        // console.log(error);
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className='title-container'>
        <h1>{appState.store}</h1>
      </div>
      <AddProductForm addProduct={addProduct} />
      <div className="product-container">
        {isError && <div className='title-container'>Something went wrong ...</div>}
        {isLoading ? (
          <div className='title-container'>Loading ...</div>
        ) : (
            <List products={appState.products} />
          )}
      </div>
    </div >
  );
}

export default App;
