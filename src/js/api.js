const myApiKey = '35720970-632b5595f4a574f3205602e3c';

export const getPhotos = async searchQuery => {
  const params = new URLSearchParams({
    key: myApiKey,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const response = await axios.get(`https://pixabay.com/api/`, {
    params,
  });
  return response.data;
};
