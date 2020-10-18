import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { sendMessageInTabs } from './chrome-api/chrome';

import './index.scss';

function readyPing() {
    sendMessageInTabs();
}

ReactDOM.render(
    <React.StrictMode>
        <App readyPing={readyPing} />
    </React.StrictMode>,
    document.getElementById('root'),
);
