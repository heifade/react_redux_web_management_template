import { Action, Dispatch, AnyAction } from "redux";
import { UserModule, UserEditManageModule, StoreModule } from "../../module/module";
import { f } from "../../util/modelToReducer";
import { store } from "../../store";
import { resolve } from "path";

let initState: UserEditManageModule = {
  user: null,
  isEditing: false,
  isWaiting: false
};

export function userEditReducer(state = initState, action: Action): UserEditManageModule {
  switch (action.type) {
    case "user_edit":
      let data = {};
      for (let key in action.userData) {
        data[key] = {
          name: key,
          value: action.userData[key]
        };
      }

      return {
        ...state,
        isEditing: true,
        user: data
      };
    case "user_edit_field_changed":
      return {
        ...state,
        user: {
          ...state.user!,
          ...action.data
        }
      };
    case "user_edit_saving":
      return {
        ...state,
        isWaiting: true
      };
    case "user_edit_saved":
      return {
        ...state,
        isEditing: false,
        isWaiting: false
      };
    case "user_edit_cancel":
      return {
        ...state,
        isEditing: false
      };
    default:
      return state;
  }
}


f();