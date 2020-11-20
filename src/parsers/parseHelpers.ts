import { ValueType } from '../interfaces/values';

export const isValueTouchedCheck = (
    key: string,
    touchedValues: { [key: string]: ValueType | ValueType[] } = {},
): boolean => {
    return !!touchedValues[key];
};

export const getError = (
    key: string,
    errors: {
        [key: string]: ValueType | ValueType[];
    } = {},
): string | undefined => {
    const error = errors[key];
    switch (typeof error) {
        case 'object':
            return error === null ? undefined : JSON.stringify(error);
        case 'undefined':
            return undefined;
        default:
            return String(error);
    }
};

export const getCollapsedValue = (value: any): string | number | boolean | undefined | null => {
    switch (typeof value) {
        case 'object':
            return value === null ? null : JSON.stringify(value);
        case 'string':
            return `'${value}'`;
        case 'number':
            return value;
        case 'boolean':
            return value.toString();
        case 'undefined':
            return undefined;
        default:
            return undefined;
    }
};

export const getValueType = (value: any): ValueType => {
    switch (typeof value) {
        case 'object':
            return value === null ? 'null' : 'object';
        case 'string':
            return 'string';
        case 'number':
            return 'number';
        case 'boolean':
            return 'boolean';
        case 'undefined':
            return 'undefined';
        default:
            return 'undefined';
    }
};
