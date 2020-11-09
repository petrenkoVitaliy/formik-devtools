import React, { useEffect, useState } from 'react';

import { useMessageLoad } from '../hooks/useMessageLoad';
// import { useMessageLoadMOCK } from '../hooks/useMessageLoad';

import { FormikStateValuesList, StatusPanel } from '../components';
import { ChangedState, IFormikDetailedState, InitialProperties } from '../interfaces/formikState';

import { getChangedInitialProps, getChangedProps } from '../parsers/changesParsers';
import { parseValues } from '../parsers/valuesParsers';
import classNames from './style.module.scss';
import { StatesList } from '../components/StatesList/StatesList';

interface FormikDevtoolsProps {
    readyPing?: () => void;
    example?: boolean;
}

const FormikDevtools: React.FunctionComponent<FormikDevtoolsProps> = ({ readyPing, example }) => {
    const [, /*formProps*/ setFormProps] = useState<InitialProperties | undefined>(undefined);
    const [formikStates, setFormikStates] = useState<IFormikDetailedState[]>([]);

    const [currentStep, setCurrentStep] = useState<number>(-1);
    const { message: newMessage } = useMessageLoad(example);

    useEffect(() => {
        readyPing && readyPing();
    }, [readyPing]);

    useEffect(() => {
        if (!example) {
            console.log(formikStates);
        }
    }, [formikStates, example]);

    useEffect(() => {
        if (newMessage) {
            const { state, formProps } = parseValues(newMessage);

            if (state) {
                let savedStates = formikStates;
                let changed: ChangedState | null = null;

                if (formProps) {
                    savedStates = [];
                    setFormProps(formProps);

                    changed = getChangedInitialProps(formProps, state) || {};
                } else {
                    if (savedStates[savedStates.length - 1]) {
                        changed = getChangedProps(state, savedStates[savedStates.length - 1].state);
                    }
                }

                if (changed) {
                    setFormikStates([...savedStates, { state, changed }]);
                    setCurrentStep(savedStates.length);
                }
            }
        }
        // eslint-disable-next-line
    }, [newMessage]);

    const setNextStep = () => {
        if (currentStep < formikStates.length - 1 && currentStep > -1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const setPreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const setStep = (step: number) => {
        if (step >= 0 && step < formikStates.length) {
            setCurrentStep(step);
        }
    };

    return (
        <div className={classNames.devtoolsWrapper}>
            <div className={classNames.body}>
                {currentStep > -1 && formikStates[currentStep] && (
                    <FormikStateValuesList formikState={formikStates[currentStep].state.values} />
                )}
            </div>
            <div className={classNames.sidePanel}>
                <StatusPanel
                    currentStep={currentStep + 1}
                    steps={formikStates.length}
                    setNextStep={setNextStep}
                    setPreviousStep={setPreviousStep}
                    currentState={currentStep > -1 && formikStates[currentStep] ? formikStates[currentStep] : undefined}
                />
                <StatesList formikStates={formikStates} currentStep={currentStep} selectStep={setStep} />
            </div>
        </div>
    );
};

export default FormikDevtools;
