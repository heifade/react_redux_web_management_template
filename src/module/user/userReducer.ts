import { combineReducers } from "redux";
import { modelToReducer } from "../../app/modelToReducer";
import { listModel } from "./list/listModel";
import { editModel } from "./edit/editModel";

export let userReducer = combineReducers({
  userList: modelToReducer(listModel),
  userEdit: modelToReducer(editModel)
});


