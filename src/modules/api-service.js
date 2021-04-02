const baseUrl = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:8080/';

const fetchAllItems = accessToken => {
  if (accessToken) {
    return fetch(`${baseUrl}api/items`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return fetch(`${baseUrl}api/items`);
};

const fetchItemById = (id, accessToken) => {
  if (accessToken) {
    return fetch(`${baseUrl}api/items/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return fetch(`${baseUrl}api/items/${id}`);
};

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

const fetchContactDetailsById = id => fetch(`${baseUrl}api/users/${id}`);

const updateItemLike = (itemId, isLiked, accessToken) => fetch(`${baseUrl}api/items/${itemId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
  body: JSON.stringify({ isLiked }),
});

module.exports = {
  fetchAllItems,
  postItemToAPI,
  postNewUserToAPI,
  fetchItemById,
  fetchContactDetailsById,
  updateItemLike,
};
