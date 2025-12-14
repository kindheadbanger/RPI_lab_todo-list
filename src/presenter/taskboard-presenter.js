import TaskboardComponent from '../view/taskboard-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import EmptyListComponent from '../view/empty-list-component.js';

import { render } from '../framework/render.js';
import { Status, StatusTitles } from '../const.js';

export default class TaskBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskboardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  #handleModelChange() {
    this.#tasksBoardComponent.element.innerHTML = '';
    this.init();
  }

  init() {
    render(this.#tasksBoardComponent, this.#boardContainer);

    this.#renderTasksLists();
  }

  #renderTasksLists() {
    Object.values(Status).forEach((status) => {
      const taskListComponent = new TaskListComponent({
        status: status,
        label: StatusTitles[status],
        onTaskDrop: this.#handleTaskDrop.bind(this)
      });

      render(taskListComponent, this.#tasksBoardComponent.element);

      const ul = taskListComponent.element.querySelector('.tasklist__items');
      const tasksForStatus = this.#tasksModel.tasks.filter(t => t.status === status);

      if (tasksForStatus.length === 0) {
        this.#renderEmptyList(ul);
      } else {
        tasksForStatus.forEach(task => this.#renderTask(task, ul, status));
      }

      if (status === Status.TRASH) {
        this.#renderClearButton(taskListComponent.element);
      }
    });
  }

  #renderTask(task, container, status) {
    const taskComponent = new TaskComponent({
        task,
        onDrop: this.#handleTaskReorder.bind(this, status)
    });
    render(taskComponent, container);
  }

  #renderEmptyList(container) {
    const empty = new EmptyListComponent();
    render(empty, container);
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

  #handleTaskDrop(taskId, newStatus) {
    this.#tasksModel.updateTaskStatus(taskId, newStatus);
  }

  createTask() {
    const taskInput = document.querySelector('#add-task');
    const title = taskInput.value.trim();
    if (!title) return;

    this.#tasksModel.addTask(title);
    taskInput.value = '';
  }

  #handleTaskReorder(status, draggedId, targetId) {
  this.#tasksModel.reorderTask(draggedId, targetId, status);
  }
}
