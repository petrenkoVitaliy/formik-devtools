# Formik Devtools

[![NPM version](https://badgen.net/npm/v/@vitaliyptt/formik_devtools)](https://www.npmjs.com/package/@vitaliyptt/formik_devtools)

Chrome extension for debugging Formik (https://github.com/formium/formik) state.

## 1. Installation:

### 1.1 install package with [npm](https://www.npmjs.com/):

```bash
TODO))
```

### 1.2 install chrome extension:

```bash
TODO))
```

## 2. Usage:

### 2.1 inside your component containing `<Formik/>` use:

```tsx
import { withFormikDevtools } from "@vitaliyptt/formik_devtools";

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
