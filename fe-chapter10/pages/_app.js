import "../styles/globals.css";
import Header from "../components/header/headers";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/globals.css'
import { Provider } from "react-redux";
import { store } from "../share/redux/store";
config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header/>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;
