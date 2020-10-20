import React from 'react';
import classnames from 'classnames';
import { IFormikStateWithChanged } from '../../interfaces/formikState';

import classNames from './style.module.scss';

interface StatusPanelProps {
    currentStep: number;
    steps: number;
    isInitValuesShown: boolean;
    currentState?: IFormikStateWithChanged;

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
            <div className={classNames.status}>
                {currentState && <div className={classNames.statusAttr}>Dirty: {currentState.state.dirty + ''}</div>}

                <div
                    className={classnames([classNames.statusButton], {
                        [classNames.initValuesShown]: isInitValuesShown,
                    })}
                    onClick={toggleInitValues}
                >
                    {isInitValuesShown ? 'hide init values' : 'show init values'}
                </div>
            </div>
            <div className={classNames.status}>
                {currentState && <div className={classNames.statusAttr}>Changed Props: {currentState.changed}</div>}
            </div>
        </div>
    );
};
