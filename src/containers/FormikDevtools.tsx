import React, { useEffect, useMemo, useState } from 'react';

import { useMessageLoad } from '../hooks/useMessageLoad';
// import { useMessageLoadMOCK } from '../hooks/useMessageLoad';

import { FormikStateValuesList, StatusPanel } from '../components';
import { ChangedState, IFormikDetailedState } from '../interfaces/formikState';

import { getChangedInitialProps, getChangedProps } from '../parsers/changesParsers';
import { parseValues } from '../parsers/valuesParsers';
import classNames from './style.module.scss';
import { StatesList } from '../components/StatesList/StatesList';

interface FormikDevtoolsProps {
    readyPing?: () => void;
    example?: boolean;
}

interface FormikFormsStates {
    [key: string]: IFormikDetailedState[];
}

const EMPTY_FORM_NAME = 'unnamed_form';

const FormikDevtools: React.FunctionComponent<FormikDevtoolsProps> = ({ readyPing, example }) => {
    const [formikStates, setFormikStates] = useState<FormikFormsStates>({ [EMPTY_FORM_NAME]: [] });
    const [currentForm, setCurrentForm] = useState<string>(EMPTY_FORM_NAME);

    const [currentStep, setCurrentStep] = useState<number>(-1);
    const { message: newMessage } = useMessageLoad();

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
            const formName = newMessage.__formName || EMPTY_FORM_NAME;
            const { state, formProps } = parseValues(newMessage);

            let savedStates = formikStates[formName] || [];

            if (state) {
                let changed: ChangedState | null = null;

                if (formProps) {
                    savedStates = [];
                    changed = getChangedInitialProps(formProps, state) || {};
                } else {
                    if (savedStates[savedStates.length - 1]) {
                        changed = getChangedProps(state, savedStates[savedStates.length - 1].state);
                    }
                }

                if (changed) {
                    const newFormikStates = { ...formikStates, [formName]: [...savedStates, { state, changed }] };
                    setFormikStates(newFormikStates);
                    if (currentForm === formName) {
                        setCurrentStep(savedStates.length);
                    }
                    if (currentForm === EMPTY_FORM_NAME && formName !== EMPTY_FORM_NAME) {
                        setCurrentForm(formName);
                        setCurrentStep(savedStates.length);
                    }
                }
            }
        }
        // eslint-disable-next-line
    }, [newMessage]);

    const formsList = useMemo(() => Object.keys(formikStates).filter((formName) => !!formikStates[formName].length), [
        formikStates,
    ]);

    const setNextStep = () => {
        if (currentStep < formikStates[currentForm].length - 1 && currentStep > -1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const setPreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const setStep = (step: number) => {
        if (step >= 0 && step < formikStates[currentForm].length) {
            setCurrentStep(step);
        }
    };

    const handleSelectForm = (formName: string) => {
        if (formikStates[formName]) {
            setCurrentForm(formName);
            setCurrentStep(formikStates[formName].length - 1);
        }
    };

    return (
        <div className={classNames.devtoolsWrapper}>
            <div className={classNames.body}>
                {currentStep > -1 && formikStates[currentForm][currentStep] && (
                    <FormikStateValuesList formikState={formikStates[currentForm][currentStep].state.values} />
                )}
            </div>
            <div className={classNames.sidePanel}>
                <StatusPanel
                    currentStep={currentStep + 1}
                    steps={formikStates[currentForm].length}
                    setNextStep={setNextStep}
                    setPreviousStep={setPreviousStep}
                    selectedForm={currentForm}
                    handleSelectForm={handleSelectForm}
                    formsList={formsList}
                    currentState={
                        currentStep > -1 && formikStates[currentForm][currentStep]
                            ? formikStates[currentForm][currentStep]
                            : undefined
                    }
                />
                <StatesList
                    isFormsList={formsList.length > 1}
                    formikStates={formikStates[currentForm]}
                    currentStep={currentStep}
                    selectStep={setStep}
                />
            </div>
        </div>
    );
};

export default FormikDevtools;
