import React from 'react';
import classnames from 'classnames';

import { IFormikDetailedState } from '../../interfaces/formikState';

import classNames from './style.module.scss';

interface StatusPanelProps {
    currentStep: number;
    steps: number;
    formsList: string[];
    selectedForm: string;
    currentState?: IFormikDetailedState;

    handleSelectForm: (formName: string) => void;
    setNextStep: () => void;
    setPreviousStep: () => void;
}

export const StatusPanel: React.FunctionComponent<StatusPanelProps> = (props) => {
    const {
        currentStep,
        steps,
        setNextStep,
        setPreviousStep,
        currentState,
        formsList,
        selectedForm,
        handleSelectForm,
    } = props;

    const handleFormChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleSelectForm(event.target.value);
    };

    return (
        <div className={classnames(classNames.statusPanel, { [classNames.withSelect]: formsList.length > 1 })}>
            {formsList.length > 1 && (
                <div className={classNames.selectWrapper}>
                    <div className={classNames.selectLabel}>Current Form:</div>
                    <select value={selectedForm} onChange={handleFormChange}>
                        {formsList.map((formName) => (
                            <option value={formName} key={formName}>
                                {formName}
                            </option>
                        ))}
                    </select>
                </div>
            )}
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
