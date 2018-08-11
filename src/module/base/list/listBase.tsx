import * as React from "react";
import { ComponentProps } from "../../../app/componentProps";
import { Dispatch } from "../../../../node_modules/redux";
import { ModelBase } from "../../../app/modelBase";

let styles = require("./listBase.less");

export abstract class ListBaseComponent extends React.Component<ComponentProps, any> {
  public listModel: ModelBase;
  public editModel: ModelBase;
  constructor(props: ComponentProps, context: any) {
    super(props, context);
  }

  abstract async onFetch(): Promise<any>;

  abstract async onGetDetail(data: any): Promise<any>;

  abstract async onDelete(data: any): Promise<any>;

  onShowEditHandle = (data: any) => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: this.listModel.getActionType("showLoadding")
      });

      dispatch({
        type: this.listModel.getActionType("showEditDialog")
      });

      dispatch({
        type: this.editModel.getActionType("showEditDialog"),
        data: await this.onGetDetail(data)
      });

      dispatch({
        type: this.listModel.getActionType("hideLoading")
      });
    });
  };
  onDeleteHandle = (data: any) => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: this.listModel.getActionType("showLoadding")
      });

      await this.onDelete(data);

      dispatch({
        type: this.listModel.getActionType("listFetched"),
        list: await this.onFetch()
      });

      dispatch({
        type: this.listModel.getActionType("hideLoading")
      });
    });
  };

  componentDidMount() {
    this.props.dispatch(async (dispatch: Dispatch) => {
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
}


export function mapStateToProps(listModel: ModelBase) {
  return (state: any, ownProps: any) => {
    return {
      modelData: listModel.getState()
    };
  };
}