const sendFormikDevtoolsMessage = function (props) {
    try {
        if (props) {
            document.dispatchEvent(
                new CustomEvent('FORMIK_DEVTOOLS_EVENT', {
                    detail: JSON.stringify(props),
                }),
            );
        }
    } catch (ex) {
        console.log(ex);
    }
};

window.FORMIK_DEVTOOLS = sendFormikDevtoolsMessage;
