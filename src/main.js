import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import fetchPixabayAPI from './js/pixabay-api.js';
import renderGallery from './js/render-functions.js';

import axios from 'axios';
import icon from './img/icon-close.svg';

const optionsSearch = new URLSearchParams({
  key: '4348225-c90d49c3185e1d6dd0df9aa80',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
  page: 1,
});

const loader = document.querySelector('.loader');
const loaderMore = document.querySelector('.loader-more');

const gallery = document.querySelector('.gallery');

const form = document.querySelector('.form');

const btnLoadMore = document.querySelector('.btn-load-more');

form.addEventListener('submit', event => {
  event.preventDefault();
  const searchRequest = event.target.elements.input.value.trim();

  if (searchRequest) {
    gallery.innerHTML = '';
    loader.classList.remove('invisible');
    optionsSearch.set('q', searchRequest);
    optionsSearch.set('page', 1);

    fetchPixabayAPI(optionsSearch)
      .then(async data => {
        if (data.hits.length === 0) {
          loader.classList.add('invisible');
          gallery.innerHTML = '';
          iziToast.error({
            position: 'topRight',
            maxWidth: '380px',
            progressBar: false,
            iconUrl: icon,
            transitionIn: 'fadeInLeft',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
          });
        } else {
          loader.classList.add('invisible');
          gallery.innerHTML = await renderGallery(data.hits);
          optionsSearch.set('page', Number(optionsSearch.get('page')) + 1);

          const gallerySimple = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionDelay: 250,
          });
          gallerySimple.refresh();
          if (data.hits.length < data.total) {
            btnLoadMore.classList.remove('invisible');
          }
        }
      })
      .catch(err => {
        iziToast.error({
          position: 'topRight',
          maxWidth: '380px',
          progressBar: false,
          iconUrl: icon,
          transitionIn: 'fadeInLeft',
          message: `Error:${err} `,
        });
      });
  } else {
    loader.classList.add('invisible');
    gallery.innerHTML = '';
    iziToast.show({
      progressBar: false,
      position: 'topRight',
      maxWidth: '380px',
      iconUrl: icon,
      transitionIn: 'fadeInLeft',
      message: 'Put the request!',
    });
  }
  form.reset();
});

btnLoadMore.addEventListener('click', loadMore);

function loadMore() {
  btnLoadMore.classList.add('invisible');
  loaderMore.classList.remove('invisible');
  fetchPixabayAPI(optionsSearch).then(data => {
    if (data.hits.length === 0) {
      loaderMore.classList.add('invisible');
      gallery.innerHTML = '';
      iziToast.error({
        position: 'topRight',
        maxWidth: '380px',
        progressBar: false,
        iconUrl: icon,
        transitionIn: 'fadeInLeft',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      loaderMore.classList.add('invisible');
      gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits));
      optionsSearch.set('page', Number(optionsSearch.get('page')) + 1);
      const gallerySimple = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      gallerySimple.refresh();
      const cardSize = document
        .querySelector('.image-box')
        .getBoundingClientRect().height;
      window.scrollBy({
        top: cardSize * 2 + 72,
        behavior: 'smooth',
      });
      if (
        (Number(optionsSearch.get('page')) - 1) *
          Number(optionsSearch.get('per_page')) <
        data.total
      ) {
        btnLoadMore.classList.remove('invisible');
      } else {
        iziToast.show({
          position: 'topRight',
          maxWidth: '380px',
          progressBar: false,
          iconUrl: icon,
          transitionIn: 'fadeInLeft',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    }
  });
}
