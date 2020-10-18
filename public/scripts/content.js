(function () {
    console.log('content init');

    function injectScript(file) {
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', file);
        document.documentElement.appendChild(s);
    }

    chrome.runtime.onMessage.addListener(function (request) {
        if (request.message === 'start') {
            const runtimeId = chrome.runtime.id;
            const port = chrome.runtime.connect(runtimeId);

            injectScript(chrome.extension.getURL('/scripts/war.js'));

            console.log('content injected');
            document.addEventListener('formikDevtoolsEvent', ({ detail: formikProps }) => {
                port.postMessage({ formikProps });
            });
        }
    });
})();
