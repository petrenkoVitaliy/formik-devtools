const BROWSER = chrome || browser;

let portToDevtoolsScript = null;
let portToContentScript = null;

BROWSER.runtime.onConnect.addListener((port) => {
    if (port.name === 'devtools') {
        portToDevtoolsScript = port;

        portToDevtoolsScript.onMessage.addListener((request) => {
            if (request.tabId) {
                BROWSER.tabs.sendMessage(request.tabId, { message: 'start' });
            }
        });
    }

    if (portToDevtoolsScript && port.name === 'content') {
        portToContentScript = port;

        portToContentScript.onMessage.addListener((request) => {
            if (request.formikProps) {
                portToDevtoolsScript.postMessage(request);
            }
        });
    }
});

BROWSER.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (portToDevtoolsScript && changeInfo.status === 'complete') {
        portToDevtoolsScript.postMessage({ action: 'restart' });
    }
});
