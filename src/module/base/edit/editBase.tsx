import * as React from "react";
import { Dispatch } from "redux";
import { ComponentProps } from "../../../app/componentProps";
import { wait } from "../../../app/utils";
import { ModelBase } from "../../../app/modelBase";

let styles = require("./editBase.less");

export abstract class EditBaseComponent extends React.Component<ComponentProps, any> {
  public listModel: ModelBase;
  public editModel: ModelBase;
  constructor(props: ComponentProps, context: any) {
    super(props, context);
  }

  abstract async onSaveUser(data: any): Promise<any>;
  abstract async onFetch(): Promise<any>;

  onSaveHandle = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(async (dispatch: Dispatch) => {
          dispatch({
            type: this.editModel.getActionType("showSaveBtnLoadding")
          });

          await this.onSaveUser(values);

          dispatch({
            type: this.editModel.getActionType("hideSaveBtnLoading")
          });

          dispatch({
            type: this.editModel.getActionType("editDialogClosing")
          });

          dispatch({
            type: this.listModel.getActionType("showLoadding")
          });

          dispatch({
            type: this.listModel.getActionType("listFetched"),
            list: await this.onFetch()
          });

          dispatch({
            type: this.listModel.getActionType("hideLoading")
          });
        });
      }
    });
  };
  onCloseHandle = () => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: this.editModel.getActionType("editDialogClosing")
      });
    });
  };

  onAfterCloseHandle = () => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: this.listModel.getActionType("disposeEditDialog")
      });
    });
  };
}
