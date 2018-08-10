import { Action, combineReducers } from "redux";
import { model as userListModel } from "./userList/userListModel";
import { model as userEditModel } from "./userEdit/userEditModel";
import { connect } from "react-redux";
import { modelToReducer } from "../util/modelToReducer";

// export function userManageReducer(state = new UserManageModule(), action: Action) {
//   return {
//     userList: userListReducer(state.userList, action),
//     currEditUser: userEditReducer(state.currEditUser, action),
//   }
// }

export let userManageReducer = combineReducers({
  userListManage: modelToReducer(userListModel),
  userEditManage: modelToReducer(userEditModel)
});
