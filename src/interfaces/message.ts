import { ValueType } from './values';

export interface IMessage {
    values: {
        [key: string]: ValueType;
    };
    initialValues: {
        [key: string]: ValueType;
    };
    initialErrors: {
        [key: string]: ValueType | ValueType[];
    };
    initialTouched: {
        [key: string]: ValueType | ValueType[];
    };
    errors: {
        [key: string]: ValueType | ValueType[];
    };
    touched: {
        [key: string]: ValueType | ValueType[];
    };
    dirty: boolean;
    __init: boolean;
    __formName?: string;
}
