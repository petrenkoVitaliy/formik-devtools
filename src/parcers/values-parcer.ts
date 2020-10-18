import { IFormikState } from '../interfaces/formikState';

export const parceValues = (formikProps: string) => {
    if (formikProps) {
        const formikState: any = JSON.parse(formikProps);

        const formikValuesShape: IFormikState = {};
        Object.entries(formikState.values).forEach(([valueName, value]) => {
            const collapsedValue = getCollapcedValue(value);
            const error = getError(formikState.errors, valueName);
            const touched = isValueTouchedCheck(formikState.touched, valueName);

            formikValuesShape[valueName] = { value, collapsedValue, error, touched };
        });

        return formikValuesShape;
    }

    return null;
};

const isValueTouchedCheck = (touchedValues: { [key: string]: boolean }, key: string): boolean => {
    return touchedValues[key];
};

const getError = (errors: { [key: string]: string }, key: string): string | undefined => {
    return errors[key] || undefined;
};

const getCollapcedValue = (value: any): string | number | undefined | null => {
    switch (typeof value) {
        case 'object':
            return value === null ? null : JSON.stringify(value);
        case 'string':
            return value;
        case 'number':
            return value;
        case 'undefined':
            return undefined;
        default:
            return undefined;
    }
};
