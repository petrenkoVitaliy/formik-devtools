export interface IFormikState {
    [key: string]: IFormikValues;
}

export interface IFormikValues {
    value: any;
    collapsedValue: string | number | boolean | undefined | null;
    error: string | undefined;
    touched: boolean;
}
