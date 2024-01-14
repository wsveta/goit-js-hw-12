import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  loadBtn: document.querySelector('.load-more'),
};

const KEY = '41029112-ec6e065fca3f0d308b81a7ee5';
axios.defaults.baseURL = 'https://pixabay.com/api/';
let page = 1;
let searchQuery = null;

refs.loadBtn.addEventListener('click', async () => {
  page += 1;
  const resp = await fetchImages(page, searchQuery);
 makeCards(resp);
  if (page === Math.ceil(resp.data.totalHits / 40)) {
    refs.loadBtn.classList.add('hidden');
    iziToast.show({
      message:
        "We're are sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
    return;
  }
});

refs.form.addEventListener('submit', async event => {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  page = 1;

  searchQuery = refs.input.value.trim();

  if (!searchQuery) {
    return;
  }
    const resp = await fetchImages(page, searchQuery);
    if (page === 1) {
      makeCards(resp);
      if (resp.data.totalHits === 0) {
        console.log('!');
        refs.loadBtn.classList.add('hidden');
        iziToast.show({
          message:
          'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      iziToast.show({
        message: `Hooray! We found ${resp.data.totalHits} images.`,
        position: 'topRight',
      });
    }
});

async function fetchImages(pag, searchQuery) {
  const params = new URLSearchParams({
    key: KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: pag,
    per_page: 40,
  });

try {
   return await axios.get(`?${params}`);
} catch (error) {
  console.error('Error fetching images:', error);
}
}

async function makeCards(response) {
  response.data.totalHits <= 40
    ? refs.loadBtn.classList.add('hidden')
    : refs.loadBtn.classList.remove('hidden');

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
  <span class="loader"></span>
  <img class="image" src="${webformatURL}" alt="${tags}"  />
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
    image.addEventListener('load', async event => {
      const loader = event.target.previousElementSibling;
      if (loader !== null) {
        loader.classList.add('loader-hidden');
  
        loader.addEventListener('transitionend', () => {
          loader.remove();
        });
      }
    })
  );

  let simplelightbox = new SimpleLightbox('.gallery a', {});
  simplelightbox.refresh();

  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight / 3,
    behavior: 'smooth',
  });
}

