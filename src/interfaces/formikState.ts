export interface IFormikState {
    [key: string]: IFormikValues;
}

export interface IFormikValues {
    value: any;
    collapsedValue: string | number | undefined | null;
    error: string | undefined;
    touched: boolean;
}
