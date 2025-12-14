export default class Observable {
  #observers = new Map();

  addObserver(key, cb) {
    this.#observers.set(key, cb);
  }

  removeObserver(key) {
    this.#observers.delete(key);
  }

  _notify(updateType, payload) {
    for (const cb of this.#observers.values()) {
      try {
        cb(updateType, payload);
      } catch (err) {
      }
    }
  }
}