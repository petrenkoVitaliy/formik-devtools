import { ValueType } from './values';

export interface ChangedState {
    changedProperties?: string;
    changedValues?: string;
    changedErrors?: string;
    changedTouches?: string;
    composedChangedString?: string;
}

export interface IFormikDetailedState {
    state: IFormikState;
    changed: ChangedState;
}

export interface IFormikState {
    dirty: boolean;
    values: IFormikValues;
}

export interface InitialProperties {
    name: string;
    initialValues: {
        [key: string]: IFormikValue;
    };
}

export interface IFormikValues {
    [key: string]: IFormikValue;
}

export interface IFormikValue {
    value: any;
    collapsedValue: string | number | boolean | undefined | null;
    type: ValueType;
    error: string | undefined;
    touched: boolean;
}
