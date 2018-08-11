import * as React from "react";
import { ComponentProps } from "../../../app/componentProps";
import { EditBaseComponent } from "../../base/edit/editBase";
import { Modal, Button, Form, Input, Icon } from "antd";
import { connect } from "react-redux";
import { model as listModel } from "../list/listModel";
import { model as editModel } from "./editModel";
import { listService } from "../list/listService";
let styles = require("./edit.less");

export class UserEditComponent extends EditBaseComponent {
  constructor(props: ComponentProps, context: any) {
    super(props, context);
    this.listModel = listModel;
    this.editModel = editModel;
  }

  async onSaveUser(data: any) {
    await listService.saveUser(data);
  }

  async onFetch() {
    return await listService.getUserList();
  }

  render() {
    let { data, isShowSaveBtnLoading, isShowEditDialog } = this.props.modelData;
    const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form;

    return (
      <Modal
        visible={isShowEditDialog}
        title={"用户信息编辑"}
        onCancel={this.onCloseHandle}
        afterClose={this.onAfterCloseHandle}
        footer={[
          <Button key="close" onClick={this.onCloseHandle}>
            关闭
          </Button>,
          <Button key="save" onClick={this.onSaveHandle} loading={isShowSaveBtnLoading}>
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
    if (props.modelData.data) {
      return {
        id: Form.createFormField(props.modelData.data.id),
        name: Form.createFormField(props.modelData.data.name)
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
