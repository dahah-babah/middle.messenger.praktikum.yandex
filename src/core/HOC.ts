function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function(Component: typeof Block) {
    return class extends Component {
      constructor(props) {
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({...props, ...state});

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({...newState});
          }

          // не забываем сохранить новое состояние
          state = newState;
        });
      }
    }
  }
}

function mapUserToProps(state) {
  return {
    name: state.user.name,
    avatar: state.user.avatar,
  }
}

connect(UserProfile, mapUserToProps)

/*
Иногда в два разных компонента нужно передать одинаковые данные из состояния,
поэтому будет удобнее использовать каррирование.
Таким образом можно создать компонент высшего порядка для определённых данных,
а затем обернуть в него любые другие компоненты:
 */

function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function(Component: typeof Block) {
    return class extends Component {
    ...
    }
  }
}

const withUser = connect(state => ({ user: state.user }));

withUser(UserProfile);
withUser(SettingsPage);
