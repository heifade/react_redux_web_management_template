import { AnyAction } from "redux";
import { ModelBase } from "../../util/modelBase";
import { Hash } from "../../common/Hash";

export let model = new ModelBase({
  namespace: "userEdit",
  initState: {
    user: null,
    isEditing: false,
    isWaiting: false
  },
  statePath: "userManage.userEditManage",
  reducers: {
    show(state: any, action: AnyAction) {
      let data = new Hash();
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
    },
    fieldChanged(state: any, action: AnyAction) {
      return {
        ...state,
        user: {
          ...state.user!,
          ...action.data
        }
      };
    },
    saving(state: any, action: AnyAction) {
      return {
        ...state,
        isWaiting: true
      };
    },
    saved(state: any, action: AnyAction) {
      return {
        ...state,
        isEditing: false,
        isWaiting: false
      };
    },
    cancel(state: any, action: AnyAction) {
      return {
        ...state,
        isEditing: false
      };
    }
  }
});
