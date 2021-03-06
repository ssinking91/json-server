import { createStore, combineReducers, compose } from "redux";
import Search from "./modules/Search";

//---- rootReducer ----
const rootReducer = combineReducers({ Search });

//---- redux devTools ----
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

//---- 스토어 만들기 ----
let store = (initialStore) => createStore(rootReducer, composeEnhancers());

// ---- 스토어 함수로 반환하기 ----
export default store();
