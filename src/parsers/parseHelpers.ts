import { ValueType } from '../interfaces/values';

export const isValueTouchedCheck = (key: string, touchedValues: { [key: string]: boolean } = {}): boolean => {
    return touchedValues[key];
};

export const getError = (key: string, errors: { [key: string]: string } = {}): string | undefined => {
    return errors[key] || undefined;
};

export const getCollapsedValue = (value: any): string | number | boolean | undefined | null => {
    switch (typeof value) {
        case 'object':
            return value === null ? null : JSON.stringify(value);
        case 'string':
            return value;
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
