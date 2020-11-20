const mockMessages = [
    JSON.stringify({
        values: {
            form1: 'form1',
        },
        initialValues: { form1: 'form1' },
        errors: {},
        touched: {},
        dirty: false,
        __init: true,
        __formName: 'form1',
    }),
    JSON.stringify({
        values: {
            form1: 'form2',
        },
        initialValues: { form1: 'form2' },
        errors: {},
        touched: {},
        dirty: false,
        __init: true,
        __formName: 'form2',
    }),
    JSON.stringify({
        values: {
            form1: 'unn',
        },
        initialValues: { form1: 'unn' },
        errors: {},
        touched: {},
        __init: true,
        dirty: false,
    }),
];
export { mockMessages };
