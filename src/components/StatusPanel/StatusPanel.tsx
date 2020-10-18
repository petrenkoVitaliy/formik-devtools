import React from 'react';

import classNames from './style.module.scss';

interface StatusPanelProps {
    currentStep: number;
    steps: number;
    setNextStep: () => void;
    setPreviousStep: () => void;
}

export const StatusPanel: React.FunctionComponent<StatusPanelProps> = (props) => {
    const { currentStep, steps, setNextStep, setPreviousStep } = props;

    return (
        <div className={classNames.statusPanel}>
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
    );
};
