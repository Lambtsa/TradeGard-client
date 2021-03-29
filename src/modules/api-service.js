const baseUrl = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:8080/';

const fetchAllProducts = () => fetch(`${baseUrl}api/items`);

module.exports = {
  fetchAllProducts,
};
