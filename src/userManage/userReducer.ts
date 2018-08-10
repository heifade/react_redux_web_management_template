

import { combineReducers } from "redux";
import { modelToReducer } from "../util/modelToReducer";
import { model as userListModel } from "./userList/userListModel";
import { model as userEditModel } from "./userEdit/userEditModel";

export let userReducer = combineReducers({
  userListManage: modelToReducer(userListModel),
  userEditManage: modelToReducer(userEditModel)
});