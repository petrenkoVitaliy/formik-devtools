import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import { withFormikDevtools } from 'formik-devtools-extension';

import styles from '../ExtensionLiveExample/style.module.scss';

const options = [
    { id: 'NY', label: 'New York' },
    { id: 'SF', label: 'San Francisco' },
    { id: 'BA', label: 'Baltimore' },
    { id: 'OTHER', label: 'another...' },
];

const validationSchema = Yup.object().shape({
    terms: Yup.boolean(),
    jobType: Yup.array(),
    newsletter: Yup.boolean(),
    location: Yup.array().min(1, 'At least 1 option'),
    password: Yup.string().min(2, 'Too Short!').max(8, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export const FormikForm: React.FunctionComponent = () => {
    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={{
                email: '',
                password: '',
                terms: false,
                newsletter: false,
                jobType: ['designer'],
                location: [],
                social: {
                    facebook: '',
                    twitter: '',
                },
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {(formikProps) => {
                withFormikDevtools(formikProps);

                const { handleSubmit, handleChange, handleBlur, values, isSubmitting } = formikProps;

                return (
                    <form onSubmit={handleSubmit}>
                        <div className={styles.fieldBlock}>
                            <div className={styles.subtitle}>Please enter your email</div>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <ErrorMessage name="email" render={(msg) => <div className={styles.error}>{msg}</div>} />
                        </div>

                        <div className={styles.fieldBlock}>
                            <div className={styles.subtitle}>Please enter your password</div>

                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <ErrorMessage name="password" render={(msg) => <div className={styles.error}>{msg}</div>} />
                        </div>

                        <div className={styles.subtitle}>Who are you? (check all that apply)</div>

                        <div className={styles.fieldBlock}>
                            <label>
                                <Field type="checkbox" name="jobType" value="designer" />
                                Designer
                            </label>
                        </div>

                        <div className={styles.fieldBlock}>
                            <label>
                                <Field type="checkbox" name="jobType" value="developer" />
                                Developer
                            </label>
                        </div>

                        <div className={styles.fieldBlock}>
                            <label>
                                <Field type="checkbox" name="jobType" value="product" />
                                Product Manager
                            </label>
                        </div>

                        <div className={styles.fieldBlock}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="jobType"
                                    value="founder"
                                    checked={values.jobType.includes('founder')}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                Founder
                            </label>
                        </div>

                        <div className={styles.fieldBlock}>
                            <div className={styles.subtitle}>
                                Where do you work? <i>(multiple with ctrl)</i>
                            </div>
                            <Field component="select" id="location" name="location" multiple={true}>
                                {options.map(({ id, label }) => (
                                    <option key={id} value={id}>
                                        {label}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="location" render={(msg) => <div className={styles.error}>{msg}</div>} />
                        </div>

                        <div className={styles.fieldBlock}>
                            <label>
                                <Field type="checkbox" name="terms" />I accept the terms and conditions.
                            </label>
                        </div>

                        {!!values.terms ? (
                            <div className={styles.fieldBlock}>
                                <label>
                                    <Field type="checkbox" name="newsletter" />
                                    Send me the newsletter
                                </label>
                            </div>
                        ) : null}

                        <div className={styles.fieldBlock}>
                            <div className={styles.subtitle}>Please enter your facebook url</div>
                            <Field name="social.facebook" />
                        </div>
                        <div className={styles.fieldBlock}>
                            <div className={styles.subtitle}>Please enter your twitter url</div>
                            <Field name="social.twitter" />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                );
            }}
        </Formik>
    );
};

export const FormikFormStringScope = {
    Formik,
    withFormikDevtools,
    validationSchema,
    styles,
    ErrorMessage,
    Field,
    options,
};

export const FormikFormString = `
/*
import { withFormikDevtools } from 'formik-devtools-extension';
...
*/

<Formik
  validationSchema={validationSchema}
  initialValues={{
    email: "",
    password: "",
    terms: false,
    newsletter: false,
    jobType: ["designer"],
    location: [],
    social: {
      facebook: "",
      twitter: "",
    },
  }}
  onSubmit={(values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }}
>
  {(formikProps) => {
    withFormikDevtools(formikProps); // use this callback to pass props to extension

    const {
      handleSubmit,
      handleChange,
      handleBlur,
      values,
      isSubmitting,
    } = formikProps;

    return (
      <form onSubmit={handleSubmit}>
        <div className={styles.fieldBlock}>
          <div className={styles.subtitle}>Please enter your email</div>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <ErrorMessage
            name="email"
            render={(msg) => <div className={styles.error}>{msg}</div>}
          />
        </div>

        <div className={styles.fieldBlock}>
          <div className={styles.subtitle}>Please enter your password</div>

          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <ErrorMessage
            name="password"
            render={(msg) => <div className={styles.error}>{msg}</div>}
          />
        </div>

        <div className={styles.subtitle}>
          Who are you? (check all that apply)
        </div>

        <div className={styles.fieldBlock}>
          <label>
            <Field type="checkbox" name="jobType" value="designer" />
            Designer
          </label>
        </div>

        <div className={styles.fieldBlock}>
          <label>
            <Field type="checkbox" name="jobType" value="developer" />
            Developer
          </label>
        </div>

        <div className={styles.fieldBlock}>
          <label>
            <Field type="checkbox" name="jobType" value="product" />
            Product Manager
          </label>
        </div>

        <div className={styles.fieldBlock}>
          <label>
            <input
              type="checkbox"
              name="jobType"
              value="founder"
              checked={values.jobType.includes("founder")}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            Founder
          </label>
        </div>

        <div className={styles.fieldBlock}>
          <div className={styles.subtitle}>
            Where do you work? <i>(multiple with ctrl)</i>
          </div>
          <Field
            component="select"
            id="location"
            name="location"
            multiple={true}
          >
            {options.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="location"
            render={(msg) => <div className={styles.error}>{msg}</div>}
          />
        </div>

        <div className={styles.fieldBlock}>
          <label>
            <Field type="checkbox" name="terms" />I accept the terms and
            conditions.
          </label>
        </div>

        {!!values.terms ? (
          <div className={styles.fieldBlock}>
            <label>
              <Field type="checkbox" name="newsletter" />
              Send me the newsletter
            </label>
          </div>
        ) : null}

        <div className={styles.fieldBlock}>
          <div className={styles.subtitle}>Please enter your facebook url</div>
          <Field name="social.facebook" />
        </div>
        <div className={styles.fieldBlock}>
          <div className={styles.subtitle}>Please enter your twitter url</div>
          <Field name="social.twitter" />
        </div>

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    );
  }}
</Formik>;

`;
