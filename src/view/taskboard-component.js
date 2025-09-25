import {createElement} from '../framework/render.js';

function createTaskboardComponentTemplate() {
  return (
    `<section class="taskboard">
    </section>`
  );
}

export default class TaskboardComponent {
  getTemplate() {
    return createTaskboardComponentTemplate();
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
