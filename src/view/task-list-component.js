import {createElement} from '../framework/render.js';

function createTaskListComponentTemplate(title, cssClass) {
  return (
    `<div class="tasklist ${cssClass}">
        <h2>${title}</h2>
        <ul class="tasklist__items"></ul>
        ${cssClass === 'trash' ? '<button class="clear">X Очистить</button>' : ''}
    </div>`
  );
}

export default class TaskListComponent {
  constructor(title, cssClass) {
    this.title = title;
    this.cssClass = cssClass;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.title, this.cssClass);
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