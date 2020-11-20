import React from 'react';
import ReactDOM from 'react-dom';

import { FormikDevtools } from './containers';

import Examples from './examples';

import './styles/resetStyles.scss';

ReactDOM.render(
    <React.StrictMode>{process.env.REACT_APP_ENV === 'test' ? <Examples /> : <FormikDevtools />}</React.StrictMode>,
    document.getElementById('root'),
);
