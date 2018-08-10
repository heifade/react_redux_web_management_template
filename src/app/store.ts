import { createStore, Action, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk"; // 允许我们 dispatch() 函数
import { userReducer } from "../module/userManage/userReducer";
import { createLogger } from "redux-logger";

// export default function reducer(state = new StoreModule(), action: Action) {
//   return {
//     userManage: userManageReducer(state.userManage, action),
//     top: topReducer(state.top, action)
//   };
// }

const loggerMiddleware = createLogger();

let reducer = combineReducers({
  user: userReducer
});

export let store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware
    // loggerMiddleware
  )
);

store.subscribe(() => {
  // console.log(1, store.getState());
});
