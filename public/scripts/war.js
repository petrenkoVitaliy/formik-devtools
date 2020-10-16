/* eslint-disable */
console.log("war");

const testFunction = function (props) {
  try {
    if (props) {
      document.dispatchEvent(
        new CustomEvent("yourCustomEvent", { detail: props })
      );
    }
  } catch (ex) {
    console.log(ex);
  }
};
window.testFunction = testFunction;
