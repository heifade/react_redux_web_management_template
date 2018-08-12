import * as React from "react";
import { Dispatch } from "redux";
import { ComponentProps } from "../../../app/componentProps";
import { ModelBase } from "../../../app/modelBase";
import { Form, Modal, Button, message } from "antd";
import { Hash } from "../../../app/hash";
import { connect } from "react-redux";
let styles = require("./editDialogBase.less");

export let ModalWdith = {
  small: 520,
  normal: 1024,
  large: 1280,
  full: () => {
    return document.documentElement.clientWidth || document.body.clientWidth;
  }
};

interface EditDialogBaseComponentProps extends ComponentProps {
  listModel: ModelBase;
  editModel: ModelBase;
  onSave: (data: any) => Promise<any>;
  onFetch: () => Promise<any>;
  title?: string;
  closable?: boolean;
  width?: number;
}

export class EditDialogBaseComponent extends React.Component<EditDialogBaseComponentProps, any> {
  constructor(props: EditDialogBaseComponentProps, context: any) {
    super(props, context);
  }

  onSaveHandle = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(async (dispatch: Dispatch) => {
          dispatch({
            type: this.props.editModel.getActionType("showSaveBtnLoadding")
          });

          let result = await this.props.onSave(values);
          if (result.success) {
            dispatch({
              type: this.props.editModel.getActionType("hideSaveBtnLoading")
            });

            dispatch({
              type: this.props.editModel.getActionType("editDialogClosing")
            });

            dispatch({
              type: this.props.listModel.getActionType("showLoadding")
            });

            let resultFetch = await this.props.onFetch();
            if (resultFetch.success) {
              dispatch({
                type: this.props.listModel.getActionType("listFetched"),
                list: resultFetch.data
              });
            } else {
              message.error(result.message || "获取数据失败！");
            }

            dispatch({
              type: this.props.listModel.getActionType("hideLoading")
            });
          } else {
            dispatch({
              type: this.props.editModel.getActionType("hideSaveBtnLoading")
            });
            message.error(result.message || "操作失败！");
          }
        });
      }
    });
  };
  onCloseHandle = () => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: this.props.editModel.getActionType("editDialogClosing")
      });
    });
  };

  onAfterCloseHandle = () => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: this.props.listModel.getActionType("disposeEditDialog")
      });
    });
  };

  render() {
    let { title, closable, width, children } = this.props;
    let { isShowSaveBtnLoading, isShowEditDialog } = this.props.modelData;
    return (
      <Modal
        visible={isShowEditDialog} // 对话框是否可见
        title={title || "编辑"} // 标题
        onCancel={this.onCloseHandle} // 点击遮罩层或右上角叉或取消按钮的回调
        afterClose={this.onAfterCloseHandle} // Modal 完全关闭后的回调
        closable={closable || true} // 是否显示右上角的关闭按钮
        maskClosable={false} // 点击蒙层是否允许关闭
        width={width || 520} // 宽度
        footer={[
          <Button key="close" onClick={this.onCloseHandle}>
            关闭
          </Button>,
          <Button key="save" onClick={this.onSaveHandle} loading={isShowSaveBtnLoading} type="primary">
            保存
          </Button>
        ]}
      >
        {children}
      </Modal>
    );
  }
}

function createForm(component: any, editModel: ModelBase) {
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
    onFieldsChange(props: any, fields: any) {
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
