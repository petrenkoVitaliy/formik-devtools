import React from 'react';

import { IFormikValues } from '../../interfaces/formikState';
import { FormikStateValues } from '../FormikStateValues';
import classNames from './style.module.scss';

interface FormikStateListProps {
    formikState: IFormikValues;
}

export const FormikStateList: React.FunctionComponent<FormikStateListProps> = (props) => {
    const { formikState } = props;

    return (
        <div className={classNames.statesList}>
            {Object.entries(formikState).map(([fieldName, state]) => (
                <FormikStateValues fieldName={fieldName} formikStateValues={state} key={fieldName} />
            ))}
        </div>
    );
};
