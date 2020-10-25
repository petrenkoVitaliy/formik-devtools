import React from 'react';
import ReactDOM from 'react-dom';

import { FormikDevtools } from './containers';
import { sendMessageInTabs } from './chrome-api/chrome';

import './styles/resetStyles.scss';

function readyPing() {
    sendMessageInTabs();
}

ReactDOM.render(
    <React.StrictMode>
        <FormikDevtools readyPing={readyPing} />
    </React.StrictMode>,
    document.getElementById('root'),
);
