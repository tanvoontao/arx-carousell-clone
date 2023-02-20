import { showAlert as showAction, hideAlert as hideAction, setAlert as setAction } from "./reducer";
import { store } from "../store";

const showAlert = () => {
    store.dispatch(showAction())
}
const hideAlert = () => {
    store.dispatch(hideAction())
}
const setAlert = (alert) => {
    store.dispatch(setAction(alert))
}


export { showAlert, hideAlert, setAlert }

// setAsyncFn,

// const setAsyncFn = async () => {
//     const result = await api()

//     store.dispatch(asynFnc(result))
// }