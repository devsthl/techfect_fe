import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import i18n from './utils/i18n';
import GlobalStyles from '~/components/GlobalStyles';
import App from '~/App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="302040461473-fjbhh6idrnuhr6t254aqjcgbp6b17u2d.apps.googleusercontent.com">
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </GoogleOAuthProvider>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
