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

const fetchAllItemsByUserId = (id, accessToken) => {
  if (accessToken) {
    return fetch(`${baseUrl}api/items/?userId=${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return fetch(`${baseUrl}api/items/?userId=${id}`);
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

const fetchLikedItems = (id, accessToken) => fetch(`${baseUrl}api/users/${id}/likes`, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

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

const getMatches = accessToken => fetch(`${baseUrl}api/matches`, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

module.exports = {
  fetchAllItems,
  postItemToAPI,
  postNewUserToAPI,
  fetchItemById,
  fetchContactDetailsById,
  updateItemLike,
  getMatches,
  fetchAllItemsByUserId,
  fetchLikedItems,
};
