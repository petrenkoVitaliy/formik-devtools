(function () {
    const BROWSER = chrome || browser;

    function injectScript(file) {
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', file);
        document.documentElement.appendChild(s);
    }
    injectScript(BROWSER.extension.getURL('/scripts/war.js'));

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

    document.addEventListener('FORMIK_DEVTOOLS_EVENT', ({ detail: formikProps }) => {
        messagesList.push({ formikProps });
        tryToConnect();
    });

    BROWSER.runtime.onMessage.addListener(function (request) {
        if (request.message === 'start') {
            port = BROWSER.runtime.connect(BROWSER.runtime.id, { name: 'content' });

            sendMessages();

            console.info('[FORMIK:DEVTOOLS] connected to extension');
        }
    });
})();
