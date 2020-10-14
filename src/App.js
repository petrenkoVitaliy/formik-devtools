import React, { useEffect } from "react";

/* eslint-disable */

function App() {
  useEffect(() => {
    chrome.devtools.panels.create(
      "My Panel",
      "icon.png",
      "index.html",
      function (panel) {
        chrome.runtime.onConnect.addListener(function (port) {
          port.onMessage.addListener(function (msg) {
            console.log(msg);
            try {
              console.log(JSON.parse(msg.props));
            } catch (ex) {
              console.log(ex);
            }
          });
        });
      }
    );
  }, []);

  // console.log(window);
  return <div className="App">{window.location.href}</div>;
}

export default App;
