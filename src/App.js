import React, { useState, useEffect } from 'react';
import List from './components/List';
import axios from 'axios';

function App() {
  const [appState, setAppState] = useState({
    products: null,
    store: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios.all([
        axios.get('http://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR/products'),
        axios.get(`http://us-central1-test-b7665.cloudfunctions.net/api/stores`),
      ])
        .then(response => {
          const allProducts = response[0];
          const name = response[1].data[0].data.name;

          setAppState({ products: allProducts, store: name });
          // console.log(allProducts, name);
        })
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      // console.log(error);
    }
    setIsLoading(false);
  }


  return (
    <div className="App">
      <div className='title-container'>
        <h1>{appState.store}</h1>
      </div>
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
