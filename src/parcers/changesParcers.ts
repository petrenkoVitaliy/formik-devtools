import { notEmpty } from '../helpers/utils';
import { ChangedState, IFormikState, IFormikValues, IFormProps } from '../interfaces/formikState';

export const getChangedProps = (prevState: IFormikState, currentState: IFormikState): ChangedState => {
    const changedProps = prevState.dirty !== currentState.dirty ? 'dirty' : '';

    const changedValuesSet = new Set<string>();
    [
        ...getChangedValues(prevState.values, currentState.values),
        ...getChangedValues(currentState.values, prevState.values),
    ].forEach((changedValue) => changedValuesSet.add(changedValue));
    const changedValues = [...changedValuesSet].join(', ');

    const changedErrorsSet = new Set<string>();
    [
        ...getChangedErrors(prevState.values, currentState.values),
        ...getChangedErrors(currentState.values, prevState.values),
    ].forEach((changedValue) => changedValuesSet.add(changedValue));
    const changedErrors = [...changedErrorsSet].join(', ');

    const changedTouchedSet = new Set<string>();
    [
        ...getChangedTouched(prevState.values, currentState.values),
        ...getChangedTouched(currentState.values, prevState.values),
    ].forEach((changedValue) => changedValuesSet.add(changedValue));
    const changedTouched = [...changedTouchedSet].join(', ');

    return {
        changedErrors,
        changedProps,
        changedTouched,
        changedValues,
    };
};

export const getChangedInitialProps = (prevState: IFormProps, currentState: IFormikState): ChangedState => {
    const changedValuesSet = new Set<string>();
    [
        ...getChangedValues(prevState.initialValues, currentState.values),
        ...getChangedValues(currentState.values, prevState.initialValues),
    ].forEach((changedValue) => changedValuesSet.add(changedValue));

    const changedValues = [...changedValuesSet].join(', ');

    return { changedValues };
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

const getChangedErrors = (prevFormikValues: IFormikValues, currentFormikValues: IFormikValues): string[] => {
    return Object.entries(prevFormikValues)
        .map(([fieldName, formikValue]) => {
            if (isValuesChangedCheck(formikValue.error, currentFormikValues[fieldName]?.error)) {
                return fieldName;
            }
            return undefined;
        })
        .filter(notEmpty);
};

const getChangedTouched = (prevFormikValues: IFormikValues, currentFormikValues: IFormikValues): string[] => {
    return Object.entries(prevFormikValues)
        .map(([fieldName, formikValue]) => {
            if (isValuesChangedCheck(formikValue.touched, currentFormikValues[fieldName]?.touched)) {
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
