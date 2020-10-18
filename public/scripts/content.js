(function () {
    console.log('content init');

    function injectScript(file) {
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', file);
        document.documentElement.appendChild(s);
        console.log('content injected');
    }
    injectScript(chrome.extension.getURL('/scripts/war.js'));

    let messagesList = [];

    document.addEventListener('formikDevtoolsEvent', ({ detail: formikProps }) => {
        messagesList.push({ formikProps });
        tryToConnect();
    });

    const runtimeId = chrome.runtime.id;
    let port;
    let isConnected = false;

    function tryToConnect() {
        if (!isConnected) {
            try {
                port = chrome.runtime.connect(runtimeId);
                isConnected = true;
            } catch (ex) {
                isConnected = false;
                console.log(ex);
            }
            if (isConnected) {
                sendMessages();
            }
        } else {
            sendMessages();
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
            isConnected = true;
        }
    });
})();