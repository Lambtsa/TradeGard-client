import React, { useEffect, useState } from 'react';
import { fetchAllItems } from '../modules/api-service';

import ItemCard from '../components/ItemCard/ItemCard';

const Home = () => {
  const [items, setItems] = useState([]);
  const [noItemError, setnoItemError] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(async () => {
    const response = await fetchAllItems();
    if (response.ok) {
      const fetchedData = await response.json();
      if (fetchedData.length === 0) {
        setnoItemError(true);
      }
      setItems(fetchedData);
    } else {
      setFetchError(true);
    }
  }, []);

  return (
    <section>
      {fetchError && <p>Items could not be fetched</p>}
      {noItemError && <p>Oops! There are no items at the moment</p>}
      {!fetchError && items.length > 0 && (
        <ul className="home__items-container">
          {items.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </ul>
      )}
      {!fetchError && !noItemError && items.length === 0
      && <p>Loading...</p>}
    </section>
  );
};

export default Home;
