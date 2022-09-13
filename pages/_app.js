import Layout from '../src/components/Layout';
import Head from 'next/head';
import thunk from 'redux-thunk';
import rootReducer from '../src/Redux/reducers';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';

//! Outils de développement Redux.

import { composeWithDevTools } from 'redux-devtools-extension';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';

//! --------------------------------------------------

//! Le store de redux.

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

//! --------------------------------------------------

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Head>
            <title>ChampiBack_V3</title>
            <meta name="description" content="Champi Resi" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp
