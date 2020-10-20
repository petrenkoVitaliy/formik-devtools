import { IFormikState, IFormProps } from '../interfaces/formikState';
import { getCollapsedValue, getError, getValueType, isValueTouchedCheck } from './parceHelpers';

export const parceValues = (formikProps: string): { state: IFormikState | null; formProps: IFormProps | null } => {
    if (formikProps) {
        const formikState: any = JSON.parse(formikProps);

        const formProps = parceInitialValues(formikState);
        const formikValuesShape: IFormikState = { values: {}, dirty: formikState.dirty };

        Object.entries(formikState.values).forEach(([valueName, value]) => {
            const type = getValueType(value);
            const error = getError(valueName, formikState.errors);
            const touched = isValueTouchedCheck(valueName, formikState.touched);
            const collapsedValue = getCollapsedValue(value);

            formikValuesShape.values[valueName] = { value, collapsedValue, error, touched, type };
        });

        return { state: formikValuesShape, formProps };
    }

    return { state: null, formProps: null };
};

const parceInitialValues = (formikState: any): IFormProps | null => {
    if (!formikState.__init) {
        return null;
    }

    const formProps: IFormProps = {
        name: formikState.__name || 'Form',
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
