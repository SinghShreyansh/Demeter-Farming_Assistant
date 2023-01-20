import React, { Component } from "react";

export default class ChatBot extends Component {
  componentDidMount() {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "2c52c9f7d222fc3a627355e0485122ae6",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }
  render() {
    return <div></div>;
  }
}
