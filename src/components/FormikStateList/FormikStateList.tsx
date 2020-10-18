import React from 'react';

import { IFormikState } from '../../interfaces/formikState';
import classNames from './style.module.scss';
import { FormikStateValues } from '../FormikStateValues';

interface FormikStateListProps {
    formikState: IFormikState;
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
