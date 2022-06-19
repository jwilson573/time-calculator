import {TimeZoneStore} from "./time-zone-store"
import {create} from "mobx-persist"
import {createContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const hydrate = create({
    storage: AsyncStorage,
    jsonify: true
})
export class RootStore {
    timeZoneStore: TimeZoneStore = new TimeZoneStore(this)
    constructor() {
        this.hydrateAndInitializeApp()
    }

    private hydrateAndInitializeApp = () => {
      hydrate("timeZoneStore", this.timeZoneStore)
        .then(_ => {
          console.log("App initialized - stores hydrateds")
        })
        .catch(_ => {
          console.log("not hydrated")
        })
    }
}


const rootStore: RootStore = new RootStore()
const StoreContext = createContext(rootStore)
export {
    TimeZoneStore,
    rootStore,
    StoreContext
}