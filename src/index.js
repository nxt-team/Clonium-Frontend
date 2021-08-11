import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))
const user_platform = startupParameters.get('vk_platform')
const mobile_platforms = ["mobile_android", "mobile_ipad", "mobile_iphone", "mobile_iphone_messenger"]

// Init VK  Mini App
bridge.send("VKWebAppInit").then(r => console.log(r));
bridge.subscribe(({ detail: { type, data }}) => {
  if (type === 'VKWebAppUpdateConfig') {
    const schemeAttribute = document.createAttribute('scheme');
    schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
    document.body.attributes.setNamedItem(schemeAttribute);
    if (mobile_platforms.indexOf(user_platform) !== -1) {
      console.log("theme set in local storage")
      bridge.send("VKWebAppStorageSet", {"key": "theme", "value": data.scheme})
          .then((data) => console.log(data))
    } else{
      console.log("user platform not in mobile platforms")
    }

  }
});
ReactDOM.render(<App />, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
