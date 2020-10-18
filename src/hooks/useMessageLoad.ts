import { useEffect, useState } from 'react';
import { addListenerToMessages } from '../chrome-api/chrome';

export const useMessageLoad = () => {
    const [message, setMessage] = useState<string | undefined>(undefined);

    useEffect(() => {
        addListenerToMessages(onMessage);
    }, []);

    const onMessage = (msg: { formikProps: string }) => {
        try {
            const message = msg;
            if (message && message.formikProps) {
                setMessage(message.formikProps);
            }
        } catch (ex) {
            console.log(ex);
            console.log(msg);
        }
    };

    return { message };
};
