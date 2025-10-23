import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate(title, cssClass) {
  return (
    `<div class="tasklist ${cssClass}">
        <h2>${title}</h2>
        <ul class="tasklist__items"></ul>
        ${cssClass === 'trash' ? '<button class="clear">X Очистить</button>' : ''}
    </div>`
  );
}

export default class TaskListComponent extends AbstractComponent {
  constructor(title, cssClass) {
    super();
    this.title = title;
    this.cssClass = cssClass;
  }

  get template() {
    return createTaskListComponentTemplate(this.title, this.cssClass);
  }
}