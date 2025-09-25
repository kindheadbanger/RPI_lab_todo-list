import HeaderComponent from './view/header-component.js';
import AddTaskComponent from './view/add-task-component.js';
import TaskboardComponent from './view/taskboard-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const mainContainer = document.querySelector('.board-app__main .board-app__inner');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

render(new AddTaskComponent(), mainContainer);

const taskboardComponent = new TaskboardComponent();
render(taskboardComponent, mainContainer);

const lists = [
  {title: 'Бэклог', cssClass: 'backlog', tasks: ['Выучить JS', 'Выучить React', 'Сделать домашку']},
  {title: 'В процессе', cssClass: 'inprocess', tasks: ['Выпить смузи', 'Попить воды']},
  {title: 'Готово', cssClass: 'completed', tasks: ['Позвонить маме', 'Погладить кота']},
  {title: 'Корзина', cssClass: 'trash', tasks: ['Сходить погулять', 'Прочитать Войну и Мир']},
];

lists.forEach(list => {
  const taskListComponent = new TaskListComponent(list.title, list.cssClass);
  render(taskListComponent, taskboardComponent.getElement());

  const ul = taskListComponent.getElement().querySelector('.tasklist__items');
  list.tasks.forEach(task => {
    render(new TaskComponent(task), ul);
  });
});