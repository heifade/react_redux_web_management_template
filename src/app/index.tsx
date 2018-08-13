import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppComponent } from "./app";
import "antd/dist/antd.css";

let div = document.createElement("div");
document.body.appendChild(div);

ReactDOM.render(<AppComponent />, div);
