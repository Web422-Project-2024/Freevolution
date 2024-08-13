const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  return localStorage.getItem('access_token');
}

function getHeaders() {
  return {
    'Authorization': `JWT ${getToken()}`,
    'Content-Type': 'application/json'
  };
}

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return await response.json();
}

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
  }
};

export async function getFavorites(userId) {
  try {
    if (userId == "") {
      return [];
    }
    const response = await fetch(`${API_URL}/user/favorites?userId=${userId}`, {
      method: 'GET',
      headers: getHeaders()
    });
    return await handleResponse(response);
  } catch (error) {
      console.error("Error fetching favorites:", error);
      throw error;
  }
}

export async function getFavoriteGames(gameIds, callback) {
  if (gameIds == "") {
    return [];
  }
  await Promise.all(
    gameIds.map(async (gameId) => {
      const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, options);
      const game = await response.json()
      return game;
    })
  ).then(values => {
    callback(values);
    return values;
  })
}

export async function addFavorite(gameId, userId) {
  try {
    const response = await fetch(`${API_URL}/user/favorites/${gameId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({id: userId})
    });
    return handleResponse(response);
  } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
  }
}

export async function removeFavorite(gameId, userId) {
  try {
    const response = await fetch(`${API_URL}/user/favorites/${gameId}`, {
      method: 'DELETE',
      headers: getHeaders(),
      body: JSON.stringify({id: userId})
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
}