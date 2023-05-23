import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { api } from "../utils/api";

import "../styles/globals.css";
import dynamic from "next/dynamic";

// Lazy-load GTM
const GoogleTagManager = dynamic(
  () => {
    return import("../components/GoogleTagManager");
  },
  { ssr: false } // This will only load GTM on the client side
);

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <GoogleTagManager />
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
