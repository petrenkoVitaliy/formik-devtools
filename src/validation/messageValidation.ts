import * as yup from 'yup';

import { IMessage } from '../interfaces/message';

export const messageValidation = yup.object<IMessage>().shape({
    values: yup.object().required(),
    initialValues: yup.object().required(),
    errors: yup.object().required(),
    touched: yup.object().required(),
    initialErrors: yup.object(),
    initialTouched: yup.object(),

    dirty: yup.boolean().required(),
    __init: yup.boolean(),
    __formName: yup.string(),
});
