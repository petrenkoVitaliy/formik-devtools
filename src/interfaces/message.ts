import { ValueType } from './values';

export interface IMessage {
    values: {
        [key: string]: ValueType;
    };
    initialValues: {
        [key: string]: ValueType;
    };
    initialErrors: {
        [key: string]: ValueType;
    };
    initialTouched: {
        [key: string]: boolean;
    };
    errors: {
        [key: string]: string;
    };
    touched: {
        [key: string]: boolean;
    };
    dirty: boolean;
    __init: boolean;
}
