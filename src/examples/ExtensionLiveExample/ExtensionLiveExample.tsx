import React, { useEffect, useState } from 'react';
import dracula from 'prism-react-renderer/themes/dracula';

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import { FormikDevtools } from '../../containers';
import { FormikForm, FormikFormString, FormikFormStringScope } from '../FormikForm/FormikForm';

import styles from './style.module.scss';

const LOAD_TIMEOUT = 1;
const IS_LIVE_RENDER = true;

export const ExtensionLiveExample: React.FunctionComponent = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsLoaded(true), LOAD_TIMEOUT); // Formik renders before FormikDevtools...
    });

    return (
        <div className={styles.exampleDevtoolsWrapper}>
            <div className={styles.formWrapper}>
                <h1>Formik Devtools live example</h1>
                <p>
                    Change the values ​​in the form and track them with <b>formik-devtools</b> preview
                </p>
                <p>*Right panel is imitating extension that could be downloaded from chrome&apos;s market</p>

                <div className={styles.links}>
                    <p>More details here:</p>

                    <a href="https://www.npmjs.com/package/formik-devtools-extension" target="/_blank">
                        npm
                    </a>
                    <a href=" https://github.com/petrenkoVitaliy/formik-devtools" target="/_blank">
                        Github
                    </a>
                    <a
                        href="https://chrome.google.com/webstore/detail/formik-devtools/dadeefbkfcpaeacnafgceahcpjlfmmjj?hl=en"
                        target="/_blank"
                    >
                        Chrome Extension
                    </a>
                    <a href="https://addons.mozilla.org/en-GB/firefox/addon/formik-devtools/" target="/_blank">
                        Firefox Addon
                    </a>
                </div>

                {isLoaded ? (
                    <>
                        <h3>Change values:</h3>
                        {IS_LIVE_RENDER ? (
                            <LiveProvider code={FormikFormString} scope={FormikFormStringScope} theme={dracula}>
                                <LivePreview />
                                <LiveError />
                                <div className={styles.editorWrapper}>
                                    <LiveEditor />
                                </div>
                            </LiveProvider>
                        ) : (
                            <FormikForm />
                        )}
                    </>
                ) : null}
            </div>
            <div className={styles.extensionWrapper}>
                <FormikDevtools example />
            </div>
        </div>
    );
};
