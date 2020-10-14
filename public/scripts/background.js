/* eslint-disable */

console.log("back");
const runtimeId = chrome.runtime.id;

chrome.runtime.onConnect.addListener(function () {
  try {
    function test(data) {
      const port = chrome.runtime.connect(runtimeId);
      port.postMessage({ props: JSON.stringify(data) });
    }
    test({ a: "kek" });
    chrome.runtime.onMessageExternal.addListener((req) => {
      test({ a: req });
    });

    chrome.runtime.onConnectExternal.addListener((port) => {
      port.onMessage.addListener(function (msg) {
        test({ a: req });
      });
    });
  } catch (ex) {
    console.log(ex);
  }
});
