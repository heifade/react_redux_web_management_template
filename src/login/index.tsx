import * as React from "react";
import * as ReactDOM from "react-dom";
import { LoginComponentForm } from "./login";

let styles = require("./login.less");

let div = document.createElement("div");
div.className = styles.divMain;
document.body.appendChild(div);

ReactDOM.render(<LoginComponentForm />, div);
