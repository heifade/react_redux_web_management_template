import { iModel } from "./iModel";
import { Action } from "redux";

export function modelToReducer(state: any, action: Action, model: iModel): any {
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
      return model.reducers[findFunction](state, {...action});
    }
  }
}

export function f() {
  let p: iModel = {
    namespace: "user_edit",
    initState: {},
    reducers: {
      add(state: any, {actionData}) {
        let data = {};
        for (let key in actionData) {
          data[key] = {
            name: key,
            value: actionData[key]
          };
        }

        return {
          ...state,
          isEditing: true,
          user: data
        };
      },
      bb() {}
    }
  };

  console.log(modelToReducer({v:1}, {type: "user_edit_add" }, p));
}
