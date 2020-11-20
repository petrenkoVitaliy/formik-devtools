# Formik Devtools

[![npm version](https://badge.fury.io/js/formik-devtools-extension.svg)](https://badge.fury.io/js/formik-devtools-extension)
[![downloads](https://img.shields.io/npm/dw/formik-devtools-extension)](https://img.shields.io/npm/dw/formik-devtools-extension)

## Browser extension for debugging [Formik](https://github.com/formium/formik) state.

## Check Demo [here](https://petrenkovitaliy.github.io/)

<p align="center">
  <img src="https://raw.github.com/petrenkoVitaliy/formik-devtools/master/.github/images/screen.png" alt="Devtools preview"/>
</p>

## 1. Installation:

### 1.1 install [Chrome extension](https://chrome.google.com/webstore/detail/formik-devtools/dadeefbkfcpaeacnafgceahcpjlfmmjj?hl=en) or [Firefox addon](https://addons.mozilla.org/en-GB/firefox/addon/formik-devtools/)

### 1.2 install package with [npm](https://www.npmjs.com/package/formik-devtools-extension):

```bash
npm i formik-devtools-extension
```

## 2. Quick Start:

### 2.1 inside your component containing `<Formik/>` use:

```tsx
import { withFormikDevtools } from "formik-devtools-extension";

/* ... */

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

### 2.2 open page you want to monitor in browser

### 2.3 open browser devtools (F12) with **"Formik tab"**

## 3. API:

-   _withFormikDevtools_ passes Formik props on every update and sends values to extension.

```ts
withFormikDevtools(formikProps: FormikProps, children?: any): children | undefined
```

-   If you have more than one Formik component, you should name them. _getFormikDevtools_ returns _withFormikDevtools_ entity with binded name.

```ts
getFormikDevtools(formName: string): withFormikDevtools
```
