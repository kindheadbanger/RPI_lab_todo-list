import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(task) {
  return `<li class="task-item">${task.title}</li>`;
}

export default class TaskComponent extends AbstractComponent {
  constructor({task, onDrop}) {
    super();
    this.task = task;
    this.#afterCreateElement(onDrop);
  }

  get template() {
    return createTaskComponentTemplate(this.task);
  }

  #afterCreateElement(onDrop) {
    this.#makeTaskDraggable();
    if (onDrop) {
      this.#makeTaskDroppable(onDrop);
    }
  }

  #makeTaskDraggable() {
    this.element.setAttribute('draggable', true);
    this.element.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.task.id);
    });
  }

  #makeTaskDroppable(onDrop) {
    this.element.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    this.element.addEventListener('drop', (event) => {
      event.preventDefault();
      const draggedTaskId = event.dataTransfer.getData('text/plain');
      const targetTaskId = this.task.id;
      onDrop(draggedTaskId, targetTaskId);
    });
  }
}