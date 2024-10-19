import { TogglableElement } from './gallery/TogglableElement.js';
import { Gallery } from './gallery/Gallery.js';

constmain = () => {
  const lightbox = new SimpleLightbox('.gallery 2#lightbox-link');
  const loader = new TogglableElement('div.loader');
  const loadMoreButton = new TogglableElement('button[type="button"].btn');

  const gallery = new Gallery('.gallery', lightbox, loader, loadMoreButton);
  let query;

  document
    .querySelector('form#image-search')
    .addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.target;
      const searchQuery = form.elements['query'].value;
      form.removeEventListener();

      query = searchQuery;
      await gallery.loadPhotos(searchQuery);
    });
    
  loadMoreButton
    .getElement()
    .addEventListener('click', () => gallery.loadPhotos(query));
};

main();
