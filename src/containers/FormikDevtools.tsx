import React, { useEffect, useState } from 'react';

import { useMessageLoad } from '../hooks/useMessageLoad';
// import { useMessageLoadMOCK } from '../hooks/useMessageLoad';

import { FormikStateList, StatusPanel } from '../components';
import { ChangedState, IFormikDetailedState, InitialProperties } from '../interfaces/formikState';

import { getChangedInitialProps, getChangedProps } from '../parsers/changesParsers';
import { parseValues } from '../parsers/valuesParsers';

interface FormikDevtoolsProps {
    readyPing: () => void;
}

const FormikDevtools: React.FunctionComponent<FormikDevtoolsProps> = ({ readyPing }) => {
    const [formProps, setFormProps] = useState<InitialProperties | undefined>(undefined);
    const [formikStates, setFormikStates] = useState<IFormikDetailedState[]>([]);

    const [currentStep, setCurrentStep] = useState<number>(-1);
    const [isInitValuesShown, setIsInitValuesShown] = useState(false);

    const { message: newMessage } = useMessageLoad();

    useEffect(() => {
        readyPing();
    }, [readyPing]);

    useEffect(() => {
        console.log(formikStates);
    }, [formikStates]);

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
        if (currentStep < formikStates.length - 1 && currentStep > -1 && !isInitValuesShown) {
            setCurrentStep(currentStep + 1);
        }
    };

    const setPreviousStep = () => {
        if (currentStep > 0 && !isInitValuesShown) {
            setCurrentStep(currentStep - 1);
        }
    };

    const toggleInitValues = () => {
        setIsInitValuesShown(!isInitValuesShown);
    };

    return (
        <div>
            <StatusPanel
                currentStep={currentStep + 1}
                steps={formikStates.length}
                setNextStep={setNextStep}
                setPreviousStep={setPreviousStep}
                currentState={currentStep > -1 && formikStates[currentStep] ? formikStates[currentStep] : undefined}
                isInitValuesShown={isInitValuesShown}
                toggleInitValues={toggleInitValues}
            />
            {currentStep > -1 && formikStates[currentStep] && !isInitValuesShown && (
                <FormikStateList formikState={formikStates[currentStep].state.values} />
            )}
            {isInitValuesShown && formProps && <FormikStateList formikState={formProps.initialValues} />}
        </div>
    );
};

export default FormikDevtools;
