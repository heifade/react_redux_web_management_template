import { WebConfig } from "happywork-config";
import { resolve } from "path";

export default async function() {
  let config: WebConfig = {
    port: 8080,
    entry: {
      index: resolve(__dirname, "./src/index")
    },
    html: [
      {
        title: "Hellow Web",
        url: resolve(__dirname, "./public/index.html")
      }
    ]
  };

  return config;
}
