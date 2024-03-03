import axios from "axios";

let fetchPixabayAPI = async set => {
  return await axios.get(`https://pixabay.com/api/?${set}`).then(request => {
    return request.data;
    
  });
};

export default fetchPixabayAPI;
