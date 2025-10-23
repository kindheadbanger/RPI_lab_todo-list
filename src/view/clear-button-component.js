import {createElement} from '../framework/render.js';

function createClearButtonTemplate() {
  return `<button class="clear">Очистить корзину</button>`;
}

export default class ClearButtonComponent extends AbstractComponent {
  get template() {
    return createClearButtonTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}