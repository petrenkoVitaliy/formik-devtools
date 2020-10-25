import { IFormikState, InitialProperties } from '../interfaces/formikState';
import { IMessage } from '../interfaces/message';
import { getCollapsedValue, getError, getValueType, isValueTouchedCheck } from './parseHelpers';

export const parseValues = (
    formikState: IMessage,
): { state: IFormikState | null; formProps: InitialProperties | null } => {
    if (formikState) {
        const formProps = parseInitialValues(formikState);
        const formikValuesShape: IFormikState = { values: {}, dirty: !!formikState.dirty };

        Object.entries(formikState.values).forEach(([valueName, value]) => {
            const type = getValueType(value);
            const error = getError(valueName, formikState.errors);
            const touched = isValueTouchedCheck(valueName, formikState.touched);
            const collapsedValue = getCollapsedValue(value);

            formikValuesShape.values[valueName] = { value, collapsedValue, error, touched, type };
        });

        const touchedAndErrorsValuesSet = new Set<string>();
        [...Object.keys(formikState.touched || {}), ...Object.keys(formikState.errors)].forEach((key) =>
            touchedAndErrorsValuesSet.add(key),
        );
        [...touchedAndErrorsValuesSet].forEach((key) => {
            if (!formikValuesShape.values[key]) {
                const error = getError(key, formikState.errors);
                const touched = isValueTouchedCheck(key, formikState.touched);

                formikValuesShape.values[key] = {
                    value: undefined,
                    collapsedValue: 'undefined',
                    error,
                    touched,
                    type: 'undefined',
                };
            }
        });

        return { state: formikValuesShape, formProps };
    }

    return { state: null, formProps: null };
};

const parseInitialValues = (formikState: IMessage): InitialProperties | null => {
    if (!formikState.__init) {
        return null;
    }

    const formProps: InitialProperties = {
        name: 'Form',
        initialValues: {},
    };

    Object.entries(formikState.initialValues).forEach(([valueName, value]) => {
        const type = getValueType(value);
        const error = getError(valueName, formikState.initialErrors);
        const touched = isValueTouchedCheck(valueName, formikState.initialTouched);
        const collapsedValue = getCollapsedValue(value);

        formProps.initialValues[valueName] = { value, collapsedValue, error, touched, type };
    });

    return formProps;
};
