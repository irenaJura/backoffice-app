import React, { useState, useEffect } from 'react';
import List from './components/List';
import axios from 'axios';

function App() {
  const [appState, setAppState] = useState({
    products: null,
    store: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
            console.log(allProducts, name);
          })
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);


  return (
    <div className="App">
      <h1>{appState.store}</h1>
      <div className="product-container">
        {isLoading ? (
          <div style={{ textAlign: "center" }}>Loading ...</div>
        ) : (
            <List products={appState.products} />
          )}
      </div>
    </div >
  );
}

export default App;
