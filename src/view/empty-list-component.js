import { AbstractComponent } from '../framework/view/abstract-component.js';

function createEmptyListTemplate() {
  return `<p class="empty-list">Перетащите карточку</p>`;
}

export default class EmptyListComponent extends AbstractComponent {
  get template() {
    return createEmptyListTemplate();
  }
}