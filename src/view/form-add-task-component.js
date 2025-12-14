import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return (
    `<section class="add-task">
        <h2>Новая задача</h2>
        <form class="new_task_form">
            <input id="add-task" type="text" placeholder="Название задачи..." required>
            <button class="add-task__button" type="submit">+ Добавить</button>
        </form>
    </section>`
  );
}

export default class FormAddTaskComponent extends AbstractComponent {
    #handleClick = null;

    constructor({onClick}) {
        super();
        this.#handleClick = onClick;
        this.element.addEventListener('submit', this.#clickHandler);
    }

    get template() {
        return createFormAddTaskComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    };
}