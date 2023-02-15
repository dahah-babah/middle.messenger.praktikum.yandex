// function connect(mapStateToProps: (state: Indexed) => Indexed) {
//   return function (Component: typeof Block) {
//     return class extends Component {
//       constructor(props) {
//         // сохраняем начальное состояние
//         let state = mapStateToProps(store.getState())
//
//         super({ ...props, ...state })
//
//         // подписываемся на событие
//         store.on(StoreEvents.Updated, () => {
//           // при обновлении получаем новое состояние
//           const newState = mapStateToProps(store.getState())
//
//           // если что-то из используемых данных поменялось, обновляем компонент
//           if (!isEqual(state, newState)) {
//             this.setProps({ ...newState })
//           }
//
//           // не забываем сохранить новое состояние
//           state = newState
//         })
//       }
//     }
//   }
// }

import Component from 'src/core/Component'
import Store, { StoreEvents } from 'src/core/Store/Store'

function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Class: typeof Component) {
    return class extends Class<{}> {
      constructor(tag: string, props = {}) {
        super(tag, { ...props, ...mapStateToProps(Store.getState()) }, '')

        Store.on(StoreEvents.UPDATED, () => {
          this.setProps({ ...mapStateToProps(Store.getState()) })
        })
      }
    }
  }
}

const withUser = connect((state) => ({ user: state.user }))

withUser(UserProfile)
withUser(SettingsPage)
