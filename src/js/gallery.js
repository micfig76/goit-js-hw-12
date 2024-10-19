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
    this.#loader.hide();
  }
}
