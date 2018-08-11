import { combineReducers } from "redux";
import { modelToReducer } from "../../app/modelToReducer";
import { model as userListModel } from "./list/listModel";
import { model as userEditModel } from "./edit/editModel";

export let user2Reducer = combineReducers({
  userList: modelToReducer(userListModel),
  userEdit: modelToReducer(userEditModel)
});


