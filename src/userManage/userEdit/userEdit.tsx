import * as React from "react";
import { UserModule, StoreModule, UserEditManageModule } from "../../module/module";
import { Dispatch } from "redux";
import { Modal, Button, Form, Input, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
let styles = require("./userEdit.less");

export interface FormProps extends FormComponentProps {
  userEditManage: UserEditManageModule;
  userNameChanged: (value: string) => {};
  save: (userEditManage: UserEditManageModule) => {};
  cancel: () => {};
}

class UserEditComponent extends React.Component<FormProps, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  onUserNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.userNameChanged(e.target.value);
  };
  onSave = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.save({ user: values });
      }
    });
  };
  onCancel = () => {
    this.props.cancel();
  };

  render() {
    let { isEditing, user, isWaiting } = this.props.userEditManage;
    user = user || { id: "", name: "" };

    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        visible={isEditing}
        title={"用户信息编辑"}
        onCancel={this.onCancel}
        footer={[
          <Button key="close" onClick={this.onCancel}>
            关闭
          </Button>,
          <Button key="save" onClick={this.onSave} loading={isWaiting}>
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

export let UserEditComponentForm = Form.create()(UserEditComponent);
