import { FormComponentProps } from "antd/lib/form";
import { Dispatch } from "redux";

export interface ComponentProps extends FormComponentProps {
  modelData: any;
  dispatch: Dispatch;
}
