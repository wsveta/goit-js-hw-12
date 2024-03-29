import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  loadBtn: document.querySelector('.load-more'),
};

const simplelightbox = new SimpleLightbox('.gallery a', {});
const perPage = 40; /* Amount of images per page */
let page = 1;
let searchQuery = null; /* Client's input */

refs.loadBtn.addEventListener('click', async () => {
  page += 1;
  const resp = await fetchImages(page, searchQuery);
  makeCards(resp);
  if (page === Math.ceil(resp.data.totalHits / perPage)) {
    refs.loadBtn.classList.add('hidden');
    iziToast.show({
      message: "We're are sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
    return;
  }
});

refs.form.addEventListener('submit', async event => {
  event.preventDefault();
  refs.loadBtn.classList.add('hidden');
  refs.gallery.innerHTML = '';
  page = 1;
  searchQuery = event.target.elements.searchQuery.value.trim();

  if (!searchQuery) {
    iziToast.show({
      message: 'Request is empty. Please enter something.',
      position: 'topRight',
    });
    return;
  }
  try {
    const resp = await fetchImages(page, searchQuery);
    if (resp.data.totalHits === 0) {
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
    makeCards(resp);
  } catch (error) {
    console.log(`Error happend: ${error}`);
  }
});

async function fetchImages(pag, searchQuery) {
  const params = new URLSearchParams({
    key: '41029112-ec6e065fca3f0d308b81a7ee5',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: pag,
    per_page: perPage,
  });

  try {
    return await axios.get(`https://pixabay.com/api/?${params}`);
  } catch (error) {
    iziToast.show({
      message: 'Error fetching images',
    });
  }
}

async function makeCards(response) {
  response.data.totalHits <= perPage
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
  refs.gallery.insertAdjacentHTML('beforeend', markup);

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

  simplelightbox.refresh();

  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight / 2,
    behavior: 'smooth',
  });
}
