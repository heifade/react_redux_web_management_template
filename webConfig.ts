import { WebConfig } from "happywork-config";
import { resolve } from "path";

export default async function() {
  let config: WebConfig = {
    port: 8081,
    entry: {
      index: resolve(__dirname, "./src/app/index"),
      login: resolve(__dirname, "./src/login/index"),
    },
    html: [
      {
        filename: "index.html",
        title: "Hellow Web",
        template: resolve(__dirname, "./public/index.html"),
        chunks: ["runtime-index", "vendor-initial", "commons-init", "index"]
      },
      {
        filename: "login.html",
        title: "登录",
        template: resolve(__dirname, "./public/login.html"),
        chunks: ["runtime-login", "vendor-initial", "commons-init", "login"]
      }
    ]
  };

  return config;
}
