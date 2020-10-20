export interface IFormikStateWithChanged {
    state: IFormikState;
    changed: string;
}

export interface IFormikState {
    dirty: boolean;
    values: IFormikValues;
}

export interface IFormProps {
    name: string;
    initialValues: {
        [key: string]: IFormikValue;
    };
}

export interface IFormikValues {
    [key: string]: IFormikValue;
}

export type ValueType = 'string' | 'number' | 'boolean' | 'object' | 'undefined' | 'null';

export interface IFormikValue {
    value: any;
    collapsedValue: string | number | boolean | undefined | null;
    type: ValueType;
    error: string | undefined;
    touched: boolean;
}
