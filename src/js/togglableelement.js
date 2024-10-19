export class TogglableElement {
  #element;

  constructor(selector) {
    this.#element = document.querySelector(selector);
  }
}
