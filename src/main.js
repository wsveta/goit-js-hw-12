import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
};

const KEY = '41029112-ec6e065fca3f0d308b81a7ee5';
axios.defaults.baseURL = 'https://pixabay.com/api/';

let page = 1;
let searchQuery = null;

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  page = 1;

  searchQuery = refs.input.value.trim();

  if (!searchQuery) {
    return;
  }
  fetchImages(page, searchQuery);
});

function fetchImages(pag, searchQuery) {
  const params = new URLSearchParams({
    key: KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: pag,
    per_page: 40,
  });

  axios
    .get(`?${params}`)
    .then(value => {
      if (page === 1) {
        if (value.data.totalHits === 0) {
          iziToast.show({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
          return;
        }
        iziToast.show({
          message: `Hooray! We found ${value.data.totalHits} images.`,
          position: 'topRight',
        });
        makeCards(value);
      }
    })
    .catch(error => console.log(error));
}

function makeCards(response) {
  const markup = response.data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a href="${largeImageURL}"><div class="photo-card">
  <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <span class="loader"></span>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${likes}
    </p>
    <p class="info-item">
      <b>Views</b><br>${views}
    </p>
    <p class="info-item">
      <b>Comments</b><br>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${downloads}
    </p>
  </div>
  </div></a>`;
      }
    )
    .join('');
  refs.gallery.innerHTML += markup;
  refs.images = document.querySelectorAll('.image');
  [...refs.images].map(image =>
    image.addEventListener('load', event => event.target.nextElementSibling.style.display = 'none')
  );


  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight / 3,
    behavior: 'smooth',
  });

  let simplelightbox = new SimpleLightbox('.gallery a', {});
  simplelightbox.refresh();
}
