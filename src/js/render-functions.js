export default function renderGallery(arr) {
  return arr.reduce((accum, item) => {
    return (accum += `<div class="image-box">
                        <a href="${item.largeImageURL}">
                       <img class="image" src=${item.webformatURL} alt="${item.tags}"  height="200" width="360"/>
                          <div class="image-discr">
                            <p class="text"><span class="image-title">Likes</span>${item.likes}</p>
                            <p class="text"><span class="image-title">Views</span>${item.views}</p>
                            <p class="text"><span class="image-title">Comments</span>${item.comments}</p>
                            <p class="text"><span class="image-title">Downloads</span>${item.downloads}</p> 
                          </div>
                        </a>
                    </div>`);
  }, '');
}
