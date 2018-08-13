import { WebConfig } from "happywork-config";
import { resolve } from "path";

export default async function() {
  let config: WebConfig = {
    port: 8081,
    entry: {
      index: resolve(__dirname, "./src/app/index"),
      // login: resolve(__dirname, "./src/login/index"),
    },
    html: [
      {
        title: "Hellow Web",
        url: resolve(__dirname, "./public/index.html")
      }, 
      
      // {
      //   title: "登录",
      //   url: resolve(__dirname, "./public/login.html")
      // }
    ]
  };

  return config;
}
