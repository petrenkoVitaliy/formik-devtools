import React from 'react';
import { ExtensionLiveExample } from './ExtensionLiveExample/ExtensionLiveExample';

interface ExtendedWindow extends Window {
    FORMIK_DEVTOOLS?: (formikProps: any) => void;
}
const extendedWindow = window as ExtendedWindow;
extendedWindow.FORMIK_DEVTOOLS = (formikProps: any) => {
    document.dispatchEvent(
        new CustomEvent('FORMIK_EXAMPLE_DEVTOOLS_EVENT', {
            detail: JSON.stringify(formikProps),
        }),
    );
};

const Examples = () => {
    return <ExtensionLiveExample />;
};

export default Examples;
