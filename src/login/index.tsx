import * as React from "react";
import * as ReactDOM from "react-dom";
import { LoginComponent } from "./login";

let div = document.createElement("div");
document.body.appendChild(div);

ReactDOM.render(<LoginComponent />, div);
