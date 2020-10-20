export const sendMessageInTabs = () => {
    if (!chrome?.tabs?.query) {
        return;
    } else {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            const activeTab = tabs[0];
            if (activeTab.id) {
                chrome.tabs.sendMessage(activeTab.id, { message: 'start' });
            }
        });
    }
};

export const addListenerToMessages = (callBack: (arg: any) => void) => {
    if (!chrome?.runtime?.onConnect || !callBack || !chrome?.tabs?.onUpdated) {
        return;
    } else {
        chrome.runtime.onConnect.addListener((port) => {
            console.log(port);
            if (!chrome.runtime.onConnect.hasListener(callBack)) {
                console.log('connected');
                port.onMessage.addListener(callBack);
            }
        });

        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            if (changeInfo.status == 'complete') {
                sendMessageInTabs();
            }
        });
    }
};
