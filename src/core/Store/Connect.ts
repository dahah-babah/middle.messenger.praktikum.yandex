import { TConstructable } from 'src/core/Component'
import Store, { IState, StoreEvents } from 'src/core/Store/Store'

export function connect(Class: TConstructable, mapStateToProps: (state: IState) => any) {
  return class extends Class {
    constructor(props: any) {
      const store = new Store()

      super({ ...props, ...mapStateToProps(store.getState()) })

      store.on(StoreEvents.UPDATED, () => {
        this.setProps({ ...mapStateToProps(store.getState()) })
      })
    }
  }
}
