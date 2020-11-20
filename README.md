# Formik Devtools

[![NPM version](https://badgen.net/npm/v/formik-devtools-extension)](https://www.npmjs.com/package/formik-devtools-extension)

## Chrome extension for debugging [Formik](https://github.com/formium/formik) state.

## Check Demo [here](https://petrenkovitaliy.github.io/)

<p align="center">
  <img src="https://raw.github.com/petrenkoVitaliy/formik-devtools/master/.github/images/screen.png" alt="Devtools preview"/>
</p>

## 1. Installation:

### 1.1 install chrome [extension](https://chrome.google.com/webstore/detail/formik-devtools/dadeefbkfcpaeacnafgceahcpjlfmmjj?hl=en)

### 1.2 install package with [npm](https://www.npmjs.com/package/formik-devtools-extension):

```bash
npm i formik-devtools-extension
```

## 2. Quick Start:

### 2.1 inside your component containing `<Formik/>` use:

```tsx
import { withFormikDevtools } from "formik-devtools-extension";

/* ... */

// pass just props
<Formik>
    {(formikProps) => {
        withFormikDevtools(formikProps);
        return <input type="file"  {/* ... */}/>
    }
</Formik>
```

OR _(both methods are equivalent)_ :

```jsx
// pass props with ReactElements

<Formik>
    {(formikProps) =>
        withFormikDevtools(formikProps,
        <div>
            <input type="file"  {/* ... */}/>
        </div>)
    }
</Formik>
```

you can also use it in functional components

```jsx
import { useFormik } from 'formik';
import { withFormikDevtools } from 'formik-devtools-extension';

export const FunctionalComponent = () => {
    // initializing a form with a hook
    const formikForm = useFormik({
        initialValues: {
            firstFormValue: '',
            secondFormValue: {},
        },
        onSubmit,
    });

    // call it at each render
    withFormikDevtools(formikForm);


    return (
        // ..your form implementation
    )
}

```

### 2.2 open page you want to monitor in browser

### 2.3 open Chrome devtools (F12) with **"Formik Devtools tab"**

## 3. API:

-   _withFormikDevtools_ passes Formik props on every update and sends values to extension.

```ts
withFormikDevtools(formikProps: FormikProps, children?: any): children | undefined
```

-   If you have more than one Formik component, you should name them. _getFormikDevtools_ returns _withFormikDevtools_ entity with binded name.

```ts
getFormikDevtools(formName: string): withFormikDevtools
```
