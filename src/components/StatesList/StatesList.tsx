import React, { useMemo } from 'react';
import { IFormikDetailedState } from '../../interfaces/formikState';
import classnames from 'classnames';
import classNames from './style.module.scss';

interface StatesListProps {
    formikStates: IFormikDetailedState[];
    currentStep: number;
    selectStep: (step: number) => void;
}

export const StatesList: React.FunctionComponent<StatesListProps> = (props) => {
    const { formikStates, currentStep, selectStep } = props;

    const handleSelectStep = (step: number) => () => selectStep(step);

    const reversedStates = useMemo(() => [...formikStates].reverse(), [formikStates]);

    return (
        <div className={classNames.statesList}>
            {reversedStates.map((state, index) => (
                <div
                    className={classnames(classNames.stateItem, {
                        [classNames.selected]: formikStates.length - index - 1 === currentStep,
                    })}
                    key={index}
                    onClick={handleSelectStep(formikStates.length - index - 1)}
                >
                    <div className={classNames.step}>{formikStates.length - index}:</div>
                    <div className={classNames.composedChanges}>
                        {formikStates.length - index === 1 ? '<initial values>' : state.changed.composedChangedString}
                    </div>
                </div>
            ))}
        </div>
    );
};
