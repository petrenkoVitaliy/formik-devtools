import React from 'react';
import ReactDOM from 'react-dom';

import { FormikDevtools } from './containers';
import { sendMessageInTabs } from './chrome-api/chrome';

import Examples from './examples';

import './styles/resetStyles.scss';

function readyPing() {
    sendMessageInTabs();
}

ReactDOM.render(
    <React.StrictMode>
        {process.env.REACT_APP_ENV === 'test' ? <Examples /> : <FormikDevtools readyPing={readyPing} />}
    </React.StrictMode>,
    document.getElementById('root'),
);
