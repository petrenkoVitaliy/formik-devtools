/* eslint-disable */
console.log("war");

const testFunction = function (props) {
  const runtimeId = "eaccmemlioepeifojfobdgdfojdlfaip";
  try {
    if (props) {
      chrome.runtime.sendMessage(runtimeId, JSON.stringify(props));
    }
  } catch (ex) {
    console.log(ex);
  }
};
window.testFunction = testFunction;
