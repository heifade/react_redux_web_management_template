import { FormComponentProps } from "antd/lib/form";

interface dispatchProps {
  type: string;
  [key: string]: any;
}

export interface ComponentProps extends FormComponentProps {
  modelData: any;
  dispatch: (props: dispatchProps) => {};
}
