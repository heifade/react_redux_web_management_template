import * as React from "react";
import { Dispatch } from "redux";
import { Modal, Button, Form, Input, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { connect } from "react-redux";
import { model as editModel } from "./userEditModel";
import { model as listModel } from "../userList/userListModel";
let styles = require("./userEdit.less");

interface Props extends FormComponentProps {
  modelData: any;
}

function editSave(userData: any) {
  return function(dispatch: Dispatch) {
    dispatch({
      type: editModel.getActionType("saving")
    });

    return new Promise((resolve1, reject1) => {
      setTimeout(() => {
        dispatch({
          type: editModel.getActionType("saved")
        });
        resolve1();
      }, 500);
    }).then(() => {
      return new Promise((resolve3, reject3) => {
        setTimeout(() => {
          dispatch({
            type: listModel.getActionType("saved"),
            userData
          });
          resolve3();
        }, 500);
      });
    });
  };
}

class UserEditComponent extends React.Component<Props, any> {
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
      type: editModel.getActionType("cancel")
    });
  };

  render() {
    let { isEditing, user, isWaiting } = this.props.modelData;
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
