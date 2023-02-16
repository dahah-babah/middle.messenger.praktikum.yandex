import { TConstructable } from 'src/core/Component'
import Store, { StoreEvents } from 'src/core/Store/Store'

export function connect(Class: TConstructable, mapStateToProps: (state: any) => any) {
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
