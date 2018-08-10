import { combineReducers } from "redux";
import { modelToReducer } from "../../app/modelToReducer";
import { model as userListModel } from "./userList/userListModel";
import { model as userEditModel } from "./userEdit/userEditModel";

export let userReducer = combineReducers({
  userList: modelToReducer(userListModel),
  userEdit: modelToReducer(userEditModel)
});


