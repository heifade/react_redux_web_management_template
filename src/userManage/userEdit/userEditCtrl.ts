import { connect } from "react-redux";
import { Action, Dispatch, AnyAction } from "redux";
import { UserEditComponentForm } from "./userEdit";
import { UserModule, UserEditManageModule, StoreModule } from "../../module/module";
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
      return {
        ...state,
        isEditing: true,
        user: Reflect.get(action, "userData")
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

const mapStateToProps = (state: StoreModule, ownProps: any) => {
  return {
    userEditManage: state.userManage.userEditManage
  };
};

export default connect(mapStateToProps)(UserEditComponentForm);
