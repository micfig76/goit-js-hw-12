import { getPhotos } from './api';

// const gallery = new Gallery('.gallery', lightbox, loader, loadMoreButton);
export class Gallery {
  #element;
  #lightbox;
  #loader;
  #loadMoreButton;

  constructor(selector, lightbox, loader, loadMoreButton) {
    this.#element = document.querySelector(selector);
    this.#lightbox = lightbox;
    this.#loader = loader;
    this.#loadMoreButton = loadMoreButton;
  }

  async loadPhotos(searchQuery) {
    this.#loader.show();
    const data = await getPhotos(searchQuery);
    console.log(data);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search. Please try again later',
        position: 'topRight',
      });
      this.#element.replaceChildren();
      return;
    }

    const cards = data.hits
      .map(toGalleryPhoto)
      .map(createCard)
      .map(card => applyLightbox(card, this.#lightbox));

    this.#element.replaceChildren(...cards);
    this.#lightbox.refresh();

    this.#loader.hide();
  }
}
const toGalleryPhoto = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
});

const createCard = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  const template = document.querySelector('template#card-template');
  const card = document.importNode(template.content, true);

  const lightboxLink = card.querySelector('a#lightbox-link');
  lightboxLink.href = largeImageURL;

  const img = card.querySelector('img.card-img');
  img.src = webformatURL;
  img.alt = tags;
  img.title = tags;

  card.querySelector(
    'span.card-stats-item-count[data-item="likes"]'
  ).textContent = likes;

  card.querySelector(
    'span.card-stats-item-count[data-item="views"]'
  ).textContent = views;

  card.querySelector(
    'span.card-stats-item-count[data-item="comments"]'
  ).textContent = comments;

  card.querySelector(
    'span.card-stats-item-count[data-item="downloads"]'
  ).textContent = downloads;

  return card;
};

function applyLightbox(card, lightbox) {
  card.querySelector('a#lightbox-link').addEventListener('click', event => {
    event.preventDefault();

    const closeModalOnEscape = event => {
      if (event.key === 'Escape') {
        document.removeEventListener('keydown', closeModalOnEscape);
        lightbox.close();
      }
    };

    document.addEventListener('keydown', closeModalOnEscape);

    lightbox.open(event.currentTarget);
  });

  return card;
}
