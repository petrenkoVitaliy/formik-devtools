const mockMessages = [
    JSON.stringify({
        values: {
            test: {},
            test1: {},
        },
        initialValues: { test: {}, test1: {} },
        errors: {},
        touched: {},
        dirty: false,
        __init: true,
    }),
    JSON.stringify({
        values: {
            test: {
                c: [{ c3: { c4: { c5: { c6: 5 } } } }],
                c1: [{ c3: { c4: { c5: { c6: 5 } } } }],
                c2: [{ c3: { c4: { c5: { c6: 5 } } } }],
                d: null,
            },
            test1: { string: 'aaa', num: 1, bool: true, null: null },
            test2: undefined,
        },
        initialValues: { test: {}, test1: {} },
        errors: {},
        touched: { test2: true },
        dirty: true,
    }),
    JSON.stringify({
        values: {
            test: {
                c: [{ c3: { c4: { c5: { c6: 2 } } } }],
                c1: [{ c3: { c4: { c5: { c6: 5 } } } }],
                c2: [{ c3: { c4: { c5: { c6: 5 } } } }],
                d: null,
            },
            test1: { string: 'aaa', num: 1, bool: true, null: null },
            test2: undefined,
        },
        initialValues: { test: {}, test1: {} },
        errors: { test1: 'aaaaa', test2: 'bbb' },
        touched: { test: true },
        dirty: true,
    }),
];

export { mockMessages };

/* <Formik
validationSchema={validationSchema}
onSubmit={handleSave}
initialValues={initialValues}
enableReinitialize
initialStatus="init"
>
{(formikProps) => {
  if ((window as any).testFunction) {
    if (formikProps.status) {
      formikProps.setStatus(undefined);
      (window as any).testFunction({ ...formikProps, __init: true });
    } else {
      (window as any).testFunction(formikProps);
    }
  } */
