import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardPresenter from './presenter/taskboard-presenter.js';
import TaskModel from './model/task-model.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const mainContainer = document.querySelector('.board-app__main .board-app__inner');

const tasksModel = new TaskModel();
const taskBoardPresenter = new TaskBoardPresenter({
  boardContainer: mainContainer,
  tasksModel: tasksModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

const formAddTaskComponent = new FormAddTaskComponent({
    onClick: handleNewTaskButtonClick
});
render(formAddTaskComponent, mainContainer);

taskBoardPresenter.init();

function handleNewTaskButtonClick() {
    taskBoardPresenter.createTask();
}