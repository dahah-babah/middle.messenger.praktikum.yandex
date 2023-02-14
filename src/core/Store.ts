export enum StoreEvents {
  Updated = 'updated',
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
...

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    // метод EventBus
    this.emit(StoreEvents.Updated);
  };
}

export default new Store();

import store, { StoreEvents } from './store';

class UserProfile extends Block {
  constructor(...args) {
    super(...args);

    // запрашиваем данные у контроллера
    UserController.getUser();

    // подписываемся на событие
    store.on(StoreEvents.Updated, () => {
      // вызываем обновление компонента, передав данные из хранилища
      this.setProps(store.getState());
    });
  }

  render() {
    // внутри рендер в this.props будут достпны данные из хранилища
  }
}

class UserController {
  public getUser() {
    UserAPI.getUser()
      .then(data => store.set('user', data);
  }
}
