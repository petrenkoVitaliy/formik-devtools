# Formik Devtools

[![NPM version](https://badgen.net/npm/v/formik-devtools-extension)](https://www.npmjs.com/package/formik-devtools-extension)

## Chrome extension for debugging [Formik](https://github.com/formium/formik) state.

## Check Demo [here](https://petrenkovitaliy.github.io/)

<p align="center">
  <img src="https://raw.github.com/petrenkoVitaliy/formik-devtools/master/.github/images/screen.png" alt="Devtools preview"/>
</p>

## 1. Installation:

### 1.1 install package with [npm](https://www.npmjs.com/package/formik-devtools-extension):

```bash
npm i formik-devtools-extension
```

### 1.2 install chrome extension:

<a href="https://chrome.google.com/webstore/detail/formik-devtools/dadeefbkfcpaeacnafgceahcpjlfmmjj?hl=en" target="/_blank">Extension</a>

## 2. Usage:

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

### 2.2 open page you want to monitor in browser

### 2.3 open Chrome devtools (F12) with **"Formik Devtools tab"**
