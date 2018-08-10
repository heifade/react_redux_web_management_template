import { AnyAction } from "redux";
import { ModelBase } from "../../../app/modelBase";
import { Hash } from "../../../app/hash";

export let model = new ModelBase({
  namespace: "userEdit",
  initState: {
    user: {},
    isWaiting: false
  },
  statePath: "user.userEdit",
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
        isWaiting: false
      };
    },
  }
});
