import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from '../modules/api-service';
import './Home.scss';

import ItemCard from '../components/ItemCard/ItemCard';

const Home = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(async () => {
    const response = await fetchAllProducts();
    if (response.ok) {
      const fetchedData = await response.json();
      setItems(fetchedData);
    } else {
      setError(true);
    }
  }, []);

  return (
    <section className="section__container">
      {error && <p>Items could not be fetched</p>}
      {!error && items.length > 0 && (
        <ul className="home__items-container">
          {items.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </ul>
      )}
      {!error && items.length === 0
      && <p>Oops! There are no items at the moment</p>}
    </section>
  );
};

export default Home;
