import { useEffect, useState } from 'react';
import { addListenerToMessages, addListenerToExampleMessages } from '../browser-api/browser';
import { validateValue } from '../helpers/validate';
import { IMessage } from '../interfaces/message';
import { messageValidation } from '../validation/messageValidation';
import { mockMessages } from '../__mock/messagesMock';

export const useMessageLoad = (isExample?: boolean) => {
    const [message, setMessage] = useState<IMessage | undefined>(undefined);

    useEffect(() => {
        if (isExample) {
            addListenerToExampleMessages(onMessage);
        } else {
            addListenerToMessages(onMessage);
        }
        // eslint-disable-next-line
    }, []);

    const onMessage = async (message: { formikProps: string }) => {
        try {
            if (message) {
                const validatedMessage = await validateValue<IMessage>(message.formikProps, messageValidation);

                if (validatedMessage) {
                    setMessage(validatedMessage);
                }
            }
        } catch (ex) {
            console.log(ex);
            console.log(message);
        }
    };

    return { message };
};

export const useMessageLoadMOCK = () => {
    const [message, setMessage] = useState<IMessage | undefined>(undefined);
    const DELAY = 100;

    useEffect(() => {
        sendMessage(mockMessages, 0);
        // eslint-disable-next-line
    }, []);

    const sendMessage = async (mockMessagesList: string[], index: number) => {
        if (mockMessagesList[index]) {
            const validatedMessage = await validateValue<IMessage>(mockMessagesList[index], messageValidation);

            if (validatedMessage) {
                setMessage(validatedMessage);
            }
            setTimeout(() => sendMessage(mockMessagesList, index + 1), DELAY);
        }
    };

    return { message };
};
