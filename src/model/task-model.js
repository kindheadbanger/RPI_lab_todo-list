import { tasks } from '../mock/task.js';

export default class TaskModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardtasks;
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter(task => task.status === status);
    }

    addTask(title) {
        const newTask = {
            title,
            status: 'backlog',
            id: String(Date.now())
        };
        this.#boardtasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }

    updateTaskStatus(taskId, newStatus) {
    const task = this.#boardtasks.find(task => task.id === taskId);
    if (task) {
      task.status = newStatus;
      this._notifyObservers();
    }
  }
  
    reorderTask(draggedId, targetId, status) {
        const tasks = this.#boardtasks;
        const fromIndex = tasks.findIndex(t => t.id == draggedId);
        const toIndex = tasks.findIndex(t => t.id == targetId);

        if (fromIndex === -1 || toIndex === -1) return;

        const [task] = tasks.splice(fromIndex, 1);
        task.status = status;
        tasks.splice(toIndex, 0, task);

        this._notifyObservers();
    }

}
