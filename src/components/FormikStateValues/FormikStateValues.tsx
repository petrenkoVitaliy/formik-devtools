import React, { useState } from 'react';
import classnames from 'classnames';

import { IFormikValues } from '../../interfaces/formikState';
import classNames from './style.module.scss';
import { renderValue } from '../../helpers/renderValue';

interface FormikStateValuesProps {
    formikStateValues: IFormikValues;
    fieldName: string;
}

export const FormikStateValues: React.FunctionComponent<FormikStateValuesProps> = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const { formikStateValues, fieldName } = props;

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div
            className={classnames([classNames.stateWpapper], {
                [classNames.error]: !!formikStateValues.error,
                [classNames.touched]: formikStateValues.touched,
            })}
        >
            <div className={classNames.collapsedWrap} onClick={toggleCollapse}>
                <div className={classNames.name}>
                    {isCollapsed ? (
                        <img src="icons/arrow-right.png" alt="collapse" />
                    ) : (
                        <img src="icons/arrow-down.png" alt="collapse" />
                    )}
                    {fieldName}:
                </div>
                {isCollapsed && <div className={classNames.collapsedValue}>{formikStateValues.collapsedValue}</div>}
            </div>

            {!isCollapsed && <div className={classNames.value}>{renderValue(formikStateValues.value, classNames)}</div>}
            {formikStateValues.error && <div className={classNames.errorText}>Error: {formikStateValues.error}</div>}
            {formikStateValues.touched && <div className={classNames.touchedText}>Touched</div>}
        </div>
    );
};
