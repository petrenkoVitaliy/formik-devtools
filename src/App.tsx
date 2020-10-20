import React, { useEffect, useState } from 'react';
import { FormikStateList, StatusPanel } from './components';

import { useMessageLoad } from './hooks/useMessageLoad';
import { IFormikStateWithChanged, IFormProps } from './interfaces/formikState';
import { getChangedInitialProps, getChangedProps } from './parcers/changesParcers';
import { parceValues } from './parcers/valuesParcers';

/* <Formik
validationSchema={validationSchema}
onSubmit={handleSave}
initialValues={initialValues}
enableReinitialize
initialStatus="init"
>
{(formikProps) => {
  if ((window as any).testFunction) {
    if (formikProps.status) {
      formikProps.setStatus(undefined);
      (window as any).testFunction({ ...formikProps, __init: true });
    } else {
      (window as any).testFunction(formikProps);
    }
  } */
interface AppProps {
    readyPing: () => void;
}

// const __mockMessages = [
//     JSON.stringify({
//         values: { arr: [{ a: 1 }, { a: 1 }, { a: 1 }] },
//         initialValues: { arr: [{ a: 1 }, { a: 1 }] },
//         errors: {},
//         touched: {},
//         dirty: false,
//         __init: true,
//     }),
//     JSON.stringify({
//         values: { bool: true, string: 'string', num: 1, object: { a: { b: 1 } }, arr: [1] },
//         initialValues: { num: 2 },
//         errors: { bool: 'error !!!' },
//         touched: { test: true },
//         dirty: true,
//     }),
//     JSON.stringify({
//         values: { bool: true, string: 'string', num: 1, object: { a: { b: 1 } }, arr: [1] },
//         initialValues: { num: 2 },
//         errors: { bool: 'error !!!' },
//         touched: { test: true },
//         dirty: true,
//     }),
//     JSON.stringify({
//         values: {
//             test: {
//                 test: {
//                     c: [{ c3: { c4: { c5: { c6: 5 } } } }],
//                     c1: [{ c3: { c4: { c5: { c6: 5 } } } }],
//                     c2: [{ c3: { c4: { c5: { c6: 5 } } } }],
//                     d: null,
//                 },
//             },
//             test1: { string: 'aaa', num: 1, bool: true, null: null },
//         },
//         initValues: { test: 1 },
//         errors: { test1: 'aaaaa' },
//         touched: { test: true },
//     }),
// ];

const App: React.FunctionComponent<AppProps> = ({ readyPing }) => {
    const [formProps, setFormProps] = useState<IFormProps | undefined>(undefined);
    const [formikStates, setFormikStates] = useState<IFormikStateWithChanged[]>([]);

    const [currentStep, setCurrentStep] = useState<number>(-1);
    const [isInitValuesShown, setIsInitValuesShown] = useState(false);

    const { message: newMessage } = useMessageLoad();

    useEffect(() => {
        readyPing();
    }, [readyPing]);

    // // mock
    // useEffect(() => {
    //     let formPropsCache: IFormProps | undefined = undefined;
    //     const states = __mockMessages.map((newMessage) => {
    //         const { state, formProps } = parceValues(newMessage); // mock
    //         if (formProps) {
    //             formPropsCache = formProps;
    //             setFormProps(formProps);
    //         }

    //         return state as IFormikState;
    //     });

    //     const statesWithChanged: IFormikStateWithChanged[] = [];
    //     for (let i = 0; i < states.length; i++) {
    //         if (i === 0 && formPropsCache) {
    //             statesWithChanged[i] = { state: states[i], changed: getChangedInitialProps(formPropsCache, states[i]) };
    //         } else {
    //             statesWithChanged[i] = { state: states[i], changed: getChangedProps(states[i - 1], states[i]) };
    //         }
    //     }
    //     setFormikStates([...statesWithChanged]);
    //     setCurrentStep(statesWithChanged.length - 1);
    //     // eslint-disable-next-line
    // }, []);

    useEffect(() => {
        if (newMessage) {
            const { state, formProps } = parceValues(newMessage);

            if (state) {
                let savedStates = formikStates;
                let changed = '';

                if (formProps) {
                    savedStates = [];
                    setFormProps(formProps);
                    changed = getChangedInitialProps(formProps, state);
                } else {
                    if (savedStates[savedStates.length - 1]) {
                        changed = getChangedProps(state, savedStates[savedStates.length - 1].state);
                    }
                }

                setFormikStates([...savedStates, { state, changed }]);
                setCurrentStep(savedStates.length);
            }
        }
        // eslint-disable-next-line
    }, [newMessage]);

    useEffect(() => {
        console.log(formikStates);
    }, [formikStates]);

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
        <div className="app-w">
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

export default App;
