import TaskboardComponent from '../view/taskboard-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import EmptyListComponent from '../view/empty-list-component.js';
import {render} from '../framework/render.js';
import {Status, StatusTitles} from '../const.js';

export default class TaskBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskboardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    const tasks = this.#tasksModel.tasks;

    Object.values(Status).forEach((status) => {
      this.#renderTasksList(status, tasks);
    });
  }

  #renderTasksList(status, allTasks) {
    const tasksForStatus = allTasks.filter((task) => task.status === status);
    const taskListComponent = new TaskListComponent(StatusTitles[status], status);
    render(taskListComponent, this.#tasksBoardComponent.element);

    const ul = taskListComponent.element.querySelector('.tasklist__items');

    if (tasksForStatus.length === 0) {
      this.#renderEmptyList(ul);
    } else {
      tasksForStatus.forEach((task) => {
        this.#renderTask(task, ul);
      });
    }

    if (status === Status.TRASH) {
      this.#renderClearButton(taskListComponent.element);
    }
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, container);
  }

  #renderClearButton(container) {
    const button = container.querySelector('.clear');
    if (button) {
      button.addEventListener('click', () => {
        container.querySelector('.tasklist__items').innerHTML = '';
        button.disabled = true;
      });
    }
  }

  #renderEmptyList(container) {
    const emptyListComponent = new EmptyListComponent();
    render(emptyListComponent, container);
  }
}