import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskboardComponentTemplate() {
  return (
    `<section class="taskboard">
    </section>`
  );
}

export default class TaskboardComponent extends AbstractComponent {
  get template() {
    return createTaskboardComponentTemplate();
  }
}