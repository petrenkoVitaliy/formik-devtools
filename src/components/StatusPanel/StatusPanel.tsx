import React from 'react';
import { IFormikDetailedState } from '../../interfaces/formikState';

import classNames from './style.module.scss';

interface StatusPanelProps {
    currentStep: number;
    steps: number;
    currentState?: IFormikDetailedState;

    setNextStep: () => void;
    setPreviousStep: () => void;
}

export const StatusPanel: React.FunctionComponent<StatusPanelProps> = (props) => {
    const { currentStep, steps, setNextStep, setPreviousStep, currentState } = props;

    return (
        <div className={classNames.statusPanel}>
            <div className={classNames.controls}>
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

            {currentState && (
                <div className={classNames.changedStatusesList}>
                    {currentState.changed.composedChangedString && <div className={classNames.title}>Changed:</div>}

                    {currentState.changed.changedProperties && (
                        <div className={classNames.changedStatus}>
                            <div className={classNames.statusAttr}>
                                <span>properties:</span> {currentState.changed.changedProperties}
                            </div>
                        </div>
                    )}
                    {currentState.changed.changedValues && (
                        <div className={classNames.changedStatus}>
                            <div className={classNames.statusAttr}>
                                <span>values:</span> {currentState.changed.changedValues}
                            </div>
                        </div>
                    )}
                    {currentState.changed.changedErrors && (
                        <div className={classNames.changedStatus}>
                            <div className={classNames.statusAttr}>
                                <span>errors:</span> {currentState.changed.changedErrors}
                            </div>
                        </div>
                    )}
                    {currentState.changed.changedTouches && (
                        <div className={classNames.changedStatus}>
                            <div className={classNames.statusAttr}>
                                <span>touched:</span> {currentState.changed.changedTouches}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
