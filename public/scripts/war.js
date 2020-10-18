console.log('war init');

let testFunction = function (props) {
    try {
        if (props) {
            document.dispatchEvent(
                new CustomEvent('formikDevtoolsEvent', {
                    detail: JSON.stringify(props),
                }),
            );
        }
    } catch (ex) {
        console.log(ex);
    }
};
window.testFunction = testFunction;
