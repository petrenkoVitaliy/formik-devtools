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

  document.addEventListener("yourCustomEvent", (e) => {
    const runtimeId = chrome.runtime.id;
    const port = chrome.runtime.connect(runtimeId);

    var data = e.detail;
    port.postMessage(JSON.stringify({ msg: data }));
  });
})();
