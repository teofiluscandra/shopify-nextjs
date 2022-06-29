import Layout from "@/components/Layout";
import GlobalState from "@/context/GlobalState";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalState>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalState>
  );
}

export default MyApp;
