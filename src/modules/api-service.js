const baseUrl = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:8080/';

const fetchAllProducts = () => fetch(`${baseUrl}api/items`);

const postItemToAPI = (newItem, accessToken) => fetch(`${baseUrl}api/items`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
  body: JSON.stringify(newItem),
});

const postNewUserToAPI = newUser => fetch(`${baseUrl}api/users`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newUser),
});

module.exports = {
  fetchAllProducts,
  postItemToAPI,
  postNewUserToAPI,
};
