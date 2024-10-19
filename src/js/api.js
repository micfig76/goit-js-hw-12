const myApiKey = '35720970-632b5595f4a574f3205602e3c';

export const getPhotos = async (searchQuery, page = 1) => {
  const params = new URLSearchParams({
    key: myApiKey,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 40,
  });

  const response = await axios.get(`https://pixabay.com/api/`, {
    params,
  });
  return response.data;
};
