import * as React from "react";
import { Dispatch } from "redux";
import { Modal, Button, Form, Input, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { connect } from "react-redux";
import { model as editModel } from "./userEditModel";
import { model as listModel } from "../userList/userListModel";
import { ComponentProps } from "../../../app/componentProps";
import { wait } from "../../../app/utils";
import { userListService } from "../userList/userListService";

let styles = require("./userEdit.less");

class UserEditComponent extends React.Component<ComponentProps, any> {
  constructor(props: ComponentProps, context: any) {
    super(props, context);
  }

  onSave = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(async (dispatch: Dispatch) => {
          dispatch({
            type: editModel.getActionType("showSaveBtnLoadding")
          });

          await userListService.saveUser(values);

          dispatch({
            type: editModel.getActionType("hideSaveBtnLoading")
          });

          dispatch({
            type: editModel.getActionType("editDialogClosing")
          });

          dispatch({
            type: listModel.getActionType("showLoadding")
          });

          let userList = await userListService.getUserList();

          dispatch({
            type: listModel.getActionType("listFetched"),
            userList
          });

          dispatch({
            type: listModel.getActionType("hideLoading")
          });
        });
      }
    });
  };
  onClose = () => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: editModel.getActionType("editDialogClosing")
      });
    });
  };

  onAfterClose = () => {
    this.props.dispatch(async (dispatch: Dispatch) => {
      dispatch({
        type: listModel.getActionType("disposeEditDialog")
      });
    });
  };

  render() {
    let { user, isShowSaveBtnLoading, isShowEditDialog } = this.props.modelData;
    const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form;

    return (
      <Modal
        visible={isShowEditDialog}
        title={"用户信息编辑"}
        onCancel={this.onClose}
        afterClose={this.onAfterClose}
        footer={[
          <Button key="close" onClick={this.onClose}>
            关闭
          </Button>,
          <Button key="save" onClick={this.onSave} loading={isShowSaveBtnLoading}>
            保存
          </Button>
        ]}
      >
        <div className={styles.userEdit}>
          <Form layout="inline">
            <Form.Item>
              {getFieldDecorator("id", {
                rules: [{ required: true, message: "请输入编号" }]
              })(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="编号" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入姓名" }]
              })(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="姓名" />)}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  }
}

let UserEditComponentForm = Form.create({
  mapPropsToFields(props) {
    if (props.modelData.user) {
      return {
        id: Form.createFormField(props.modelData.user.id),
        name: Form.createFormField(props.modelData.user.name)
      };
    }
  },
  onFieldsChange(props, fields) {
    props.dispatch({
      type: editModel.getActionType("fieldChanged"),
      data: fields
    });
  }
})(UserEditComponent);

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    modelData: editModel.getState()
  };
};

export default connect(mapStateToProps)(UserEditComponentForm);
