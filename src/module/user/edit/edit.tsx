import * as React from "react";
import { ComponentProps } from "../../common/componentProps";
import { EditDialogBaseComponent, connectForm } from "../../base/edit/editDialogBase";
import { Form, Input, Icon, Row, Col, Cascader, DatePicker, TimePicker } from "antd";
import { Select } from "../../components/select";
import { listModel } from "../list/listModel";
import { editModel } from "./editModel";
import { listService } from "../list/listService";
import { FormComponentProps } from "antd/lib/form";
import { FormItemComponent } from "../../base//edit/formItem";
import { FormItemIcon } from "../../base/edit/formItemIcon";
let styles = require("./edit.less");

interface EditComponentProps extends FormComponentProps {}

class EditComponent extends React.Component<EditComponentProps, any> {
  constructor(props: EditComponentProps, context: any) {
    super(props, context);
  }

  onSave = async (data: any) => {
    return await listService.saveUser(data);
  };

  onFetch = async () => {
    let condition = listModel.getState().condition;
    return await listService.getUserList(condition);
  };

  render() {
    const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form;

    return (
      <EditDialogBaseComponent {...this.props} title={"用户信息编辑"} listModel={listModel} editModel={editModel} onSave={this.onSave} onFetch={this.onFetch}>
        <div className={styles.userEdit}>
          <Form layout="inline">
            <Row gutter={16}>
              <FormItemComponent label="编号">
                {getFieldDecorator("id", {
                  rules: [{ required: true, message: "请输入编号" }]
                })(<Input prefix={<FormItemIcon type="bars" />} placeholder="编号" />)}
              </FormItemComponent>

              <FormItemComponent label="性别">
                {getFieldDecorator("sex", {
                  rules: [{ required: true, message: "请输入性别" }]
                })(<Select options={[{ value: "男", text: "男" }, { value: "女", text: "女" }]} placeholder="性别" />)}
              </FormItemComponent>

              <FormItemComponent label="姓名">
                {getFieldDecorator("name", {
                  rules: [{ required: true, message: "请输入姓名" }]
                })(<Input prefix={<FormItemIcon type="user" />} placeholder="姓名" />)}
              </FormItemComponent>
              <FormItemComponent label="地址">
                {getFieldDecorator("address", {
                  rules: [{ required: true, message: "请输入地址" }]
                })(<Input prefix={<FormItemIcon type="environment-o" />} placeholder="地址" />)}
              </FormItemComponent>
            </Row>
          </Form>
        </div>
      </EditDialogBaseComponent>
    );
  }
}

export default connectForm(EditComponent, editModel);
