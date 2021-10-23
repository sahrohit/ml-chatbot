import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
	return (
		<AnimatePresence exitBeforeEnter>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</AnimatePresence>
	);
}

export default MyApp;
