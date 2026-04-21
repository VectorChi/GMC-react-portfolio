import type { AppProps } from "next/app";
import "../app/globals.css";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
