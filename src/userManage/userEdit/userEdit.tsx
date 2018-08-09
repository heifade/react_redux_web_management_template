import * as React from "react";
import { UserModule, StoreModule, UserEditManageModule } from "../../module/module";
import { Dispatch } from "redux";
import { Modal, Button, Form, Input, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { connect } from "react-redux";
let styles = require("./userEdit.less");

export interface FormProps extends FormComponentProps {
  userEditManage: UserEditManageModule;
}

function editSave(userData: UserModule) {
  return function(dispatch: Dispatch) {
    dispatch({
      type: "user_edit_saving"
    });

    return new Promise((resolve1, reject1) => {
      setTimeout(() => {
        dispatch({
          type: "user_edit_saved"
        });
        resolve1();
      }, 500);
    }).then(() => {
      return new Promise((resolve3, reject3) => {
        setTimeout(() => {
          dispatch({
            type: "user_saved",
            userData
          });
          resolve3();
        }, 500);
      });
    });
  };
}

class UserEditComponent extends React.Component<FormProps, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  onSave = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(editSave(values));
      }
    });
  };
  onCancel = () => {
    this.props.dispatch({
      type: "user_edit_cancel"
    });
  };

  render() {
    let { isEditing, user, isWaiting } = this.props.userEditManage;
    const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form;

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

let UserEditComponentForm = Form.create({
  mapPropsToFields(props) {
    if (props.userEditManage.user) {
      return {
        id: Form.createFormField(props.userEditManage.user.id),
        name: Form.createFormField(props.userEditManage.user.name)
      };
    }
  },
  onFieldsChange(props, fields) {
    props.dispatch({
      type: "user_edit_field_changed",
      data: fields
    });
  }
})(UserEditComponent);

const mapStateToProps = (state: StoreModule, ownProps: any) => {
  return {
    userEditManage: state.userManage.userEditManage
  };
};

export default connect(mapStateToProps)(UserEditComponentForm);
