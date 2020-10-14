// const port = chrome.runtime.connect();
// if (props) {
//   port.postMessage({ props: JSON.stringify(props) });
// }

const runtimeId = "eaccmemlioepeifojfobdgdfojdlfaip";

/* eslint-disable */
console.log("war");

// try {
//   console.log("-1");
//   const port = chrome.runtime.connect(runtimeId);
//   port.postMessage({ props: "asdasd" });
// } catch (ex) {
//   console.log(ex);
// }

try {
  console.log("-2");
  chrome.runtime.sendMessage(runtimeId, "ping", (response) => {
    console.log(response);
  });
} catch (ex) {
  console.log(ex);
}

const testFunction = function (props) {
  try {
    console.log("-0");
    chrome.runtime.sendMessage(runtimeId, "pingPing", (response) => {
      console.log(response);
    });
  } catch (ex) {
    console.log(ex);
  }
};
window.testFunction = testFunction;

// try {
//   console.log("-3");

//   chrome.runtime.sendMessage(runtimeId, { getTargetData: true }, (response) => {
//     console.log(response);
//   });
// } catch (ex) {
//   console.log(ex);
// }

// try {
//   console.log("-4");

//   chrome.runtime.sendMessage(
//     runtimeId,
//     { openUrlInEditor: "asda" },
//     (response) => {
//       console.log(response);
//     }
//   );
// } catch (ex) {
//   console.log(ex);
// }

// try {
//   console.log("-5");

//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, { test: "test" }, (res) => {
//       console.log(res);
//     });
//   });
// } catch (ex) {
//   console.log(ex);
// }
