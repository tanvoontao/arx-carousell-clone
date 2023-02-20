import { setModal as setAction } from "./reducer";
import { store } from "../store";

const setModal = (modal) => {
    store.dispatch(setAction(modal))
}

export { setModal }
