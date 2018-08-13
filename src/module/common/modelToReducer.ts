import { ModelBase } from "./modelBase";
import { AnyAction } from "redux";

export function modelToReducer(model: ModelBase): any {
  let reducer = (state: any, action: AnyAction) => {
    if (state == null) {
      state = model.initState;
    }

    let start = model.namespace + "_";
    if (action.type.startsWith(start)) {
      let fun = action.type.substr(start.length);
      let findFunction = null;
      for (let fun2 in model.reducers) {
        if (fun === fun2) {
          findFunction = fun;
        }
      }
      if (findFunction) {
        return model.reducers[findFunction](state, { ...action });
      }
    }
    return state;
  };

  return reducer;
}
