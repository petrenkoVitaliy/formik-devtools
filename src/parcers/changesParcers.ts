import { notEmpty } from '../helpers/utils';
import { IFormikState, IFormikValues, IFormProps } from '../interfaces/formikState';

export const getChangedProps = (prevState: IFormikState, currentState: IFormikState): string => {
    const dirtyChanged = prevState.dirty !== currentState.dirty ? 'dirty' : '';

    const changedValuesSet = new Set<string>();

    [
        ...getChangedValues(prevState.values, currentState.values),
        ...getChangedValues(currentState.values, prevState.values),
    ].forEach((changedValue) => changedValuesSet.add(changedValue));

    return [...changedValuesSet, dirtyChanged].join(', ');
};

export const getChangedInitialProps = (prevState: IFormProps, currentState: IFormikState): string => {
    const changedValuesSet = new Set<string>();

    [
        ...getChangedValues(prevState.initialValues, currentState.values),
        ...getChangedValues(currentState.values, prevState.initialValues),
    ].forEach((changedValue) => changedValuesSet.add(changedValue));

    return [...changedValuesSet].join(', ');
};

const getChangedValues = (prevFormikValues: IFormikValues, currentFormikValues: IFormikValues): string[] => {
    return Object.entries(prevFormikValues)
        .map(([fieldName, formikValue]) => {
            if (isValuesChangedCheck(formikValue.value, currentFormikValues[fieldName]?.value)) {
                return fieldName;
            }
            return undefined;
        })
        .filter(notEmpty);
};

const isValuesChangedCheck = (prevValue: any, currentValue: any): boolean => {
    if (typeof prevValue === 'object') {
        if (prevValue === null) {
            return prevValue === currentValue;
        }
        if (prevValue.length !== undefined) {
            return (
                !currentValue ||
                (prevValue as any[])
                    .map((value, index) => isValuesChangedCheck(value, currentValue[index]))
                    .some(Boolean)
            );
        } else {
            return (
                !currentValue ||
                Object.entries(prevValue as { [key: string]: any })
                    .map(([key, value]) => isValuesChangedCheck(value, currentValue[key]))
                    .some(Boolean)
            );
        }
    }
    return prevValue !== currentValue;
};
