// import React, { createContext, useContext } from 'react';
// import { toast, ToastContainer } from 'react-toastify';

// const ToastContext = createContext();

// export const useToast = () => useContext(ToastContext);

// export const ToastProvider = ({ children }) => {
//     const showToast = (type, message) => {
//         switch (type) {
//             case 'success':
//                 toast.success(message);
//                 break;
//             case 'error':
//                 toast.error(message);
//                 break;
//             case 'info':
//                 toast.info(message);
//                 break;
//             case 'loading':
//                 return toast.loading(message);
//             default:
//                 toast(message);
//         }
//     };

//     return (
//         <ToastContext.Provider value={{ showToast }}>
//             {children}
//             <ToastContainer />
//         </ToastContext.Provider>
//     );
// };


// ToastContext.js
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const [type, setType] = useState(null);

    const showToast = (type, message) => {
        setMessage(message);
        setType(type);
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            case 'info':
                toast.info(message);
                break;
            case 'loading':
                return toast.loading(message);
            default:
                toast(message);
        }
    };

    const renderToast = () => {
        if (message && type) {
            toast[type](message);
            setMessage(null);
            setType(null);
        }
    };

    return (
        <ToastContext.Provider value={{ showToast, renderToast }}>
            {children}
        </ToastContext.Provider>
    );
};