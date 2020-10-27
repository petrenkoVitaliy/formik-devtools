import React from 'react';

import { IFormikValues } from '../../interfaces/formikState';
import { FormikStateValues } from '../FormikStateValues';
import classNames from './style.module.scss';

interface FormikStateValuesListProps {
    formikState: IFormikValues;
}

export const FormikStateValuesList: React.FunctionComponent<FormikStateValuesListProps> = (props) => {
    const { formikState } = props;

    return (
        <div className={classNames.statesList}>
            {Object.entries(formikState).map(([fieldName, state]) => (
                <FormikStateValues fieldName={fieldName} formikStateValues={state} key={fieldName} />
            ))}
        </div>
    );
};
