(function () {
    console.log('content init');

    function injectScript(file) {
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', file);
        document.documentElement.appendChild(s);
    }
    injectScript(chrome.extension.getURL('/scripts/war.js'));

    let messagesList = [];

    document.addEventListener('formikDevtoolsEvent', ({ detail: formikProps }) => {
        messagesList.push({ formikProps });
        tryToConnect();
    });

    const runtimeId = chrome.runtime.id;
    let port = chrome.runtime.connect(runtimeId);
    let isConnected = false;

    function tryToConnect() {
        if (isConnected) {
            sendMessages();
        } else {
            chrome.runtime.connect(runtimeId);
        }
    }

    function sendMessages() {
        messagesList.forEach((message) => {
            port.postMessage(message);
        });
        messagesList = [];
    }

    chrome.runtime.onMessage.addListener(function (request) {
        if (request.message === 'start') {
            port = chrome.runtime.connect(runtimeId);
            console.log('got');
            isConnected = true;
            sendMessages();
        }
    });
})();
