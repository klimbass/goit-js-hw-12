let fetchPixabayAPI = set => {
  return fetch(`https://pixabay.com/api/?${set}`).then(request => {
    if (!request.ok) {
      return new Error(`Error: ${request.status}`);
    }
    return request.json();
  });
};

export default fetchPixabayAPI;
