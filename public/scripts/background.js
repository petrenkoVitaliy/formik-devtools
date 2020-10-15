/* eslint-disable */

console.log("back");
const runtimeId = chrome.runtime.id;

function test(data) {
  console.log(data);

  const port = chrome.runtime.connect(runtimeId);
  port.postMessage({ props: JSON.stringify(data) });
}

function sendExternalMessage(req) {
  test({ msg: req });
}

chrome.runtime.onConnect.addListener(function () {
  try {
    console.log("back");

    if (!chrome.runtime.onMessageExternal.hasListener(sendExternalMessage)) {
      chrome.runtime.onMessageExternal.addListener(sendExternalMessage);
    }
  } catch (ex) {
    console.log(ex);
  }
});

// chrome.runtime.onConnectExternal.addListener((port) => {
//   port.onMessage.addListener(function (msg) {
//     test({ a2: req });
//   });
// });
