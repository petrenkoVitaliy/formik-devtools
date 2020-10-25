import React, { useState } from 'react';
import classnames from 'classnames';

import { IFormikValue } from '../../interfaces/formikState';
import classNames from './style.module.scss';
import { renderValue } from '../../helpers/renderValue';
import { ValueType } from '../../interfaces/values';

interface FormikStateValuesProps {
    formikStateValues: IFormikValue;
    fieldName: string;
}

export const FormikStateValues: React.FunctionComponent<FormikStateValuesProps> = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const { formikStateValues, fieldName } = props;

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const getColorClassName = (type: ValueType) => {
        switch (type) {
            case 'string':
                return classNames.stringValueColor;
            case 'number':
                return classNames.numberValueColor;
            case 'boolean':
                return classNames.booleanValueColor;
            case 'object':
                return classNames.objectValueColor;
            case 'undefined':
                return classNames.undefinedValueColor;
            case 'null':
                return classNames.nullValueColor;
        }
    };

    return (
        <div
            className={classnames([classNames.stateWrapper], {
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
                {isCollapsed && (
                    <div className={classnames([classNames.collapsedValue], getColorClassName(formikStateValues.type))}>
                        {formikStateValues.collapsedValue}
                    </div>
                )}
            </div>
            {!isCollapsed && (
                <div className={classNames.datailedValue}>
                    <div className={classNames.value}>{renderValue(formikStateValues.value, classNames)}</div>
                </div>
            )}

            {formikStateValues.error && <div className={classNames.errorText}>Error: {formikStateValues.error}</div>}
            {formikStateValues.touched && <div className={classNames.touchedText}>Touched</div>}
        </div>
    );
};
