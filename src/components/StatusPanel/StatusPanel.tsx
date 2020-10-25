import React from 'react';
import classnames from 'classnames';
import { IFormikDetailedState } from '../../interfaces/formikState';

import classNames from './style.module.scss';

interface StatusPanelProps {
    currentStep: number;
    steps: number;
    isInitValuesShown: boolean;
    currentState?: IFormikDetailedState;

    setNextStep: () => void;
    setPreviousStep: () => void;
    toggleInitValues: () => void;
}

export const StatusPanel: React.FunctionComponent<StatusPanelProps> = (props) => {
    const {
        currentStep,
        steps,
        setNextStep,
        setPreviousStep,
        currentState,
        toggleInitValues,
        isInitValuesShown,
    } = props;

    return (
        <div className={classNames.statusPanel}>
            <div className={classNames.controls}>
                <div
                    className={classnames([classNames.statusButton], {
                        [classNames.initValuesShown]: isInitValuesShown,
                    })}
                    onClick={toggleInitValues}
                >
                    {isInitValuesShown ? 'hide init values' : 'show init values'}
                </div>
                <div className={classNames.button} onClick={setPreviousStep}>
                    Previous
                </div>
                <div className={classNames.steps}>
                    <span>{currentStep}</span> / <span>{steps}</span>
                </div>
                <div className={classNames.button} onClick={setNextStep}>
                    Next
                </div>
            </div>
            {currentState && !isInitValuesShown && (
                <>
                    {currentState.changed.changedProperties && (
                        <div className={classNames.status}>
                            <div className={classNames.statusAttr}>
                                Changed Props: {currentState.changed.changedProperties}
                            </div>
                        </div>
                    )}
                    {currentState.changed.changedValues && (
                        <div className={classNames.status}>
                            <div className={classNames.statusAttr}>
                                Changed Values: {currentState.changed.changedValues}
                            </div>
                        </div>
                    )}
                    {currentState.changed.changedErrors && (
                        <div className={classNames.status}>
                            <div className={classNames.statusAttr}>
                                Changed Errors: {currentState.changed.changedErrors}
                            </div>
                        </div>
                    )}
                    {currentState.changed.changedTouches && (
                        <div className={classNames.status}>
                            <div className={classNames.statusAttr}>
                                Changed Touched: {currentState.changed.changedTouches}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
