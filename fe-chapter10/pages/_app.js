<<<<<<< HEAD
import "../styles/globals.css";
import Header from "../components/header/headers";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
=======
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/globals.css'
import { Provider } from "react-redux";
import { store } from "../share/redux/store";
config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
>>>>>>> 9f63896d9f47a97cc92cbeb0cad7f55e289d25fe
}

export default MyApp;
