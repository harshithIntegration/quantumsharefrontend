import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import WebFont from 'webfontloader';
import { Provider } from "react-redux";
import store from "./Redux/store/store";
import { ImageProvider } from "./Context/ImageContext";
import { ImageProvider1 } from './Context/PostImageContext';
import './i18n.js';
import LocaleContext from "./LocaleContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

WebFont.load({
    google: {
        families: ['Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900', 'Roboto:400,700', 'sans-serif']
    }
});

const Root = () => {
    const [locale, setLocale] = useState('en');

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            <ImageProvider1>
                <ImageProvider>
                    <Provider store={store}>
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <GoogleOAuthProvider clientId="409442492110-3uqmgqqdd3ur012hsg1vq3thek6g9882.apps.googleusercontent.com">
                                <App />
                            </GoogleOAuthProvider>
                        </React.Suspense>
                    </Provider>
                </ImageProvider>
            </ImageProvider1>
        </LocaleContext.Provider>
    );
};

createRoot(document.getElementById("root")).render(<Root />);


createRoot(document.getElementById("root")).render(
    <ImageProvider>
        <Provider store={store}>
            <GoogleOAuthProvider clientId="409442492110-3uqmgqqdd3ur012hsg1vq3thek6g9882.apps.googleusercontent.com">
                <App />
            </GoogleOAuthProvider>
        </Provider>
    </ImageProvider>
);
