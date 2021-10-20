import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

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
