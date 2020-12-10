const BROWSER = chrome || browser;

const sendMessageInTabs = (portToBackgroundPage: browser.runtime.Port | chrome.runtime.Port) => {
    portToBackgroundPage.postMessage({
        tabId: BROWSER.devtools.inspectedWindow.tabId,
    });
};

export const addListenerToMessages = (callBack: (arg: any) => void) => {
    const portToBackgroundPage = BROWSER.runtime.connect(BROWSER.runtime.id, { name: 'devtools' });

    portToBackgroundPage.onMessage.addListener((msg: any) => {
        if (msg) {
            if (msg.action && msg.action === 'restart') {
                sendMessageInTabs(portToBackgroundPage);
            } else {
                callBack(msg);
            }
        }
    });

    sendMessageInTabs(portToBackgroundPage);
};

export const addListenerToExampleMessages = (callBack: (arg: any) => void) => {
    document.addEventListener('FORMIK_EXAMPLE_DEVTOOLS_EVENT', ({ detail: formikProps }: any) => {
        callBack({ formikProps });
    });
};
