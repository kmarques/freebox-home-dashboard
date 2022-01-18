import { loadConfiguration } from "../contexts/actions/freebox";
import FreeboxProvider from "../contexts/FreeboxContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <FreeboxProvider config={pageProps.configuration}>
      <Component {...pageProps} />
    </FreeboxProvider>
  );
}

MyApp.getServerSideProps = async (ctx) => {
  const configuration = await loadConfiguration();

  return {
    configuration,
  };
};

export default MyApp;
