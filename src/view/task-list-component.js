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
  constructor({ status, label, onTaskDrop }) {
    super();
    this.status = status;
    this.label = label;
    this.onTaskDrop = onTaskDrop;
    this.#setDropHandler();
  }

  get template() {
    return createTaskListComponentTemplate(this.label, this.status);
  }

  
  #setDropHandler() {
    const container = this.element;

    container.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    container.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      this.onTaskDrop(taskId, this.status);
    });
  }
}