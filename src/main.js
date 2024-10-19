import { TogglableElement } from './js/togglableelement.js';
import { Gallery } from './js/gallery.js';

const main = () => {
  const lightbox = new SimpleLightbox('.gallery #lightbox-link');
  const loader = new TogglableElement('div.loader');
  const loadMoreButton = new TogglableElement('button[type="button"].btn');

  const gallery = new Gallery('.gallery', lightbox, loader, loadMoreButton);
  let query;
  let page = 1;

  document
    .querySelector('form#image-search')
    .addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.target;
      const searchQuery = form.elements['query'].value;
      form.reset();

      query = searchQuery;
      page = 1;
      await gallery.loadPhotos(searchQuery, page);
    });
  const dupa = loadMoreButton.getElement();
  console.log(dupa);
  loadMoreButton.getElement().addEventListener('click', async () => {
    console.log(loadMoreButton);
    page++;
    await gallery.loadPhotos(query, page);
  });
};

main();
