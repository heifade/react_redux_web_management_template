import * as React from "react";
import { Icon } from "antd";

interface FormItemIconProps {
  type: string;
}

export class FormItemIcon extends React.Component<FormItemIconProps, any> {
  render() {
    return (
      <Icon type={this.props.type} style={{ color: "#999" }} />
    )
  }
}