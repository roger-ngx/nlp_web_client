import { Provider } from 'react-redux';
import DevTools from '../stores/devTools';

import store from '../stores/store';
import '../styles/global.css';

export default function App({Component, pageProps}) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <DevTools />
        </Provider>
    )
}