(function () {
    function injectScript(file) {
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', file);
        document.documentElement.appendChild(s);
    }
    injectScript(chrome.extension.getURL('/scripts/war.js'));

    let messagesList = [];
    let port = undefined;

    function tryToConnect() {
        if (port) {
            sendMessages();
        }
    }

    function sendMessages() {
        messagesList.forEach((message) => {
            port.postMessage(message);
        });
        messagesList = [];
    }

    document.addEventListener('formikDevtoolsEvent', ({ detail: formikProps }) => {
        messagesList.push({ formikProps });
        tryToConnect();
    });

    chrome.runtime.onMessage.addListener(function (request) {
        if (request.message === 'start') {
            port = chrome.runtime.connect(chrome.runtime.id);

            sendMessages();

            console.info('[FORMIK:DEVTOOLS] connected to extension');
        }
    });
})();
