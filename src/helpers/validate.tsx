import * as yup from 'yup';

export const validateValue = async <TValue,>(
    value: any | null | undefined,
    validation: yup.ObjectSchema,
): Promise<TValue | undefined> => {
    if (value) {
        const validatedValue = await validation
            .validate(value)
            .then((value) => {
                return value;
            })
            .catch((value) => {
                console.error(value.errors);
                console.error(value.value);
                return undefined;
            });

        return validatedValue as TValue | undefined;
    }

    return undefined;
};
