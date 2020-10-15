/* eslint-disable */
(function () {
  console.log("content");

  function injectScript(file, node) {
    var s = document.createElement("script");
    s.setAttribute("type", "text/javascript");
    s.setAttribute("src", file);
    document.documentElement.appendChild(s);
  }
  injectScript(chrome.extension.getURL("/scripts/war.js"), "body");

  const runtimeId = chrome.runtime.id;
  const port = chrome.runtime.connect(runtimeId);
  // port.postMessage({ props: JSON.stringify({ msg: "message to app" }) });

  // const script = document.createElement("script");
  // const runtimeId = "${runtimeId}";
  // script.text = `
  //     const postMessageort = ${port.postMessage.toString()}
  //     window.testFunction = function testFunction(props) {
  //       if (props) {
  //         postMessage({ props: JSON.stringify(props) });
  //       }
  //     };
  //   `;

  // document.documentElement.appendChild(script);
})();
