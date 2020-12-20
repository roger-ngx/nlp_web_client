import { Provider } from 'react-redux';
import DevTools from '../stores/devTools';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../stores/store';
import '../styles/global.css';

export default function App({Component, pageProps}) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps} />
                <DevTools />
            </PersistGate>
        </Provider>
    )
}