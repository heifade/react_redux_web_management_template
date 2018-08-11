import * as React from "react";
import { Dispatch } from "redux";
import { ComponentProps } from "../../../app/componentProps";
import { ModelBase } from "../../../app/modelBase";
import { Form } from "antd";
import { Hash } from "../../../app/hash";
import { connect } from "react-redux";

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

function createForm(component: React.ComponentClass, editModel: ModelBase) {
  return Form.create({
    mapPropsToFields(props: any) {
      let { data } = props.modelData;
      if (data) {
        let hash = new Hash();

        Reflect.ownKeys(data).map((key: string, index) => {
          hash[key] = Form.createFormField(data[key]);
        });

        return hash;
      }
    },
    onFieldsChange(props, fields) {
      props.dispatch({
        type: editModel.getActionType("fieldChanged"),
        data: fields
      });
    }
  })(component);
}

function mapStateToProps(editModel: ModelBase) {
  return (state: any, ownProps: any) => {
    return {
      modelData: editModel.getState()
    };
  };
}

export function connectForm(component: any, editModel: ModelBase) {
  let editComponentForm = createForm(component, editModel);

  return connect(mapStateToProps(editModel))(editComponentForm);
}