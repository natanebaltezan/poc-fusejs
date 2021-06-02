import React, { useState } from 'react';
import './App.css';
import Fuse from 'fuse.js';
import products from './products.json';

function App() {
  const [query, updateQuery] = useState('');

  const fuse = new Fuse(products, {
    keys: [
      'name',
      'tags'
    ],
    includeScore: true,
    minMatchCharLength: 4,
    includeMatches: true,
    isCaseSensitive: false
  });

  const results = fuse.search(query);
  console.log('results', results)
  const productResults = query ? results.map(product => product.item) : products;

  function onSearch({ currentTarget }) {
    updateQuery(currentTarget.value);
  }

  return (
    <>
      <header className='App-header'>
        <div className='container'>
          <h1>Um front bem bonito</h1>
        </div>
      </header>

      <main className='container'>
        <ul className='products'>
          {productResults.map(product => {
            const { name, category, image } = product;
            return (
              <li key={name} className='product'>
                <span className='product-image' style={{
                  backgroundImage: `url(${image})`
                }} />
                <ul className='products-meta'>
                  <li>
                    <strong>Nome:</strong> {name}
                  </li>
                  <li>
                    <strong>Categoria:</strong> {category}
                  </li>
                </ul>
              </li>
            )
          })}
        </ul>
        <aside>
          <form className='search'>
            <label>Search</label>
            <input type='text' value={query} onChange={onSearch} />
          </form>
        </aside>
      </main>
    </>
  );
}

export default App;
