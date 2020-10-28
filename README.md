# Formik Devtools

[![NPM version](https://badgen.net/npm/v/@vitaliyptt/formik_devtools)](https://www.npmjs.com/package/@vitaliyptt/formik_devtools)

Chrome extension for live monitor Formik (https://github.com/formium/formik) state values

### Usage:

-   install package with [npm](https://www.npmjs.com/):

```bash
npm i @vitaliyptt/formik_devtools
```

-   install chrome extension:

```bash
TODO))
```

-   inside your component with Formik component use:

```tsx
import { withFormikDevtools } from "@vitaliyptt/formik_devtools";

/* ... */

// pass just props
<Formik>
    {(formikProps) => {
        withFormikDevtools(formikProps);
        return <input type="file"  .../>
    }
</Formik>


/* OR (equal)*/

// pass props with ReactElements
<Formik>
    {(formikProps) =>
        withFormikDevtools(
            formikProps,
            <div>
                ...
            </div>
        )
    }
</Formik>
```

-   open page you want to monitor in browser
-   open Chrome devtools (F12) with **"Formik Devtools tab"**
