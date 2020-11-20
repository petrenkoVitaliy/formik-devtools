interface ExtendedWindow extends Window {
    FORMIK_DEVTOOLS?: (formikProps: any) => void;
}
const extendedWindow: ExtendedWindow | null = typeof window === 'undefined' ? null : window;

const FormikDevtools = () => {
    let isInitialRender = true;
    return <T, M>(formikProps: T, children?: M) => {
        if (extendedWindow?.FORMIK_DEVTOOLS) {
            extendedWindow.FORMIK_DEVTOOLS({ ...formikProps, __init: isInitialRender });
            if (isInitialRender) {
                isInitialRender = false;
            }
        }
        return children;
    };
};

export const withFormikDevtools = FormikDevtools();

const getNamedFormikDevtools = (formName: string) => {
    let isInitialRender = true;
    return <T, M>(formikProps: T, children?: M) => {
        if (extendedWindow?.FORMIK_DEVTOOLS) {
            extendedWindow.FORMIK_DEVTOOLS({ ...formikProps, __init: isInitialRender, __formName: formName });
            if (isInitialRender) {
                isInitialRender = false;
            }
        }
        return children;
    };
};

export const getFormikDevtools = getNamedFormikDevtools;
