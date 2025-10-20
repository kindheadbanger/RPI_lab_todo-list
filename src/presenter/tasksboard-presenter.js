import TaskboardComponent from '../view/taskboard-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import {render} from '../framework/render.js';
import {Status, StatusTitles} from '../const.js';

export default class TaskBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskboardComponent();

  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    const boardTasks = [...this.#tasksModel.getTasks()];
    render(this.#tasksBoardComponent, this.#boardContainer);

    Object.values(Status).forEach((status) => {
      const tasksForStatus = boardTasks.filter((task) => task.status === status);
      const taskListComponent = new TaskListComponent(StatusTitles[status], status);
      render(taskListComponent, this.#tasksBoardComponent.getElement());

      const ul = taskListComponent.getElement().querySelector('.tasklist__items');
      tasksForStatus.forEach((task) => {
        render(new TaskComponent({task}), ul);
      });
    });
  }
}