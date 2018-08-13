import { FormComponentProps } from "antd/lib/form";

export interface ComponentProps extends FormComponentProps {
  modelData: any;
  dispatch: (props: any) => Promise<any>;
}
