import React, { useState } from 'react';
import classnames from 'classnames';

import { IFormikState } from '../../interfaces/formikState';
import classNames from './style.module.scss';
import { renderValue } from '../../helpers/renderValue';

interface FormikStateProps {
    formikState: IFormikState;
}

export const FormikState: React.FunctionComponent<FormikStateProps> = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const { formikState } = props;

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={classNames.statesList}>
            {Object.entries(formikState).map(([fieldName, state]) => {
                return (
                    <div
                        className={classnames([classNames.stateWpapper], {
                            [classNames.error]: !!state.error,
                            [classNames.touched]: state.touched,
                        })}
                        key={fieldName}
                    >
                        <div className={classNames.collapsedWrap} onClick={toggleCollapse}>
                            <div className={classNames.name}>{fieldName}:</div>
                            {isCollapsed && <div className={classNames.collapsedValue}>{state.collapsedValue}</div>}
                        </div>

                        {!isCollapsed && (
                            <div className={classNames.value} onClick={toggleCollapse}>
                                {renderValue(state.value, classNames)}
                            </div>
                        )}
                        {state.error && <div className={classNames.errorText}>Error: {state.error}</div>}
                        {state.touched && <div className={classNames.touchedText}>Touched</div>}
                    </div>
                );
            })}
        </div>
    );
};
