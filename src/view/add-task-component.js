import {createElement} from '../framework/render.js';

function createAddTaskComponentTemplate() {
  return (
    `<section class="add-task">
        <h2>Новая задача</h2>
        <form class="new_task_form">
            <input type="text" placeholder="Название задачи..." required>
            <button class="add-task__button" type="submit">+ Добавить</button>
        </form>
    </section>`
  );
}

export default class AddTaskComponent {
  getTemplate() {
    return createAddTaskComponentTemplate();
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
