import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppComponent } from "./app/app";

// import { UserEditComponentForm } from "./userManage/userEdit/userEdit";
import "antd/dist/antd.css";

let div = document.createElement("div");
document.body.appendChild(div);

ReactDOM.render(<AppComponent />, div);


// ReactDOM.render(<UserEditComponentForm />, div);