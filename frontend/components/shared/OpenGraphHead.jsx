import Head from "next/head";

const OpenGraphHead = () => {
	return (
		<Head>
			<title>Chatbot</title>
			<meta name="title" content="Chatbot" />
			<meta
				name="description"
				content="Made with love and powered by Pytorch, Python, and Nextjs, this chatbot is ready to answer all of your questions."
			/>

			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://ml-chatbot.vercel.app/" />
			<meta property="og:title" content="Chatbot with Pytorch, Python & Nextjs" />
			<meta
				property="og:description"
				content="Made with love and powered by Pytorch, Python, and Nextjs, this chatbot is ready to answer all of your questions."
			/>
			<meta property="og:image" content="https://ml-chatbot.vercel.app/meta-image.webp" />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://ml-chatbot.vercel.app/meta-image.webp" />
			<meta
				property="twitter:title"
				content="Chatbot with Pytorch, Python & Nextjs"
			/>
			<meta
				property="twitter:description"
				content="Made with love and powered by Pytorch, Python, and Nextjs, this chatbot is ready to answer all of your questions."
			/>
			<meta
				property="twitter:image"
				content="https://ml-chatbot.vercel.app/meta-image.webp"
			></meta>
		</Head>
	);
};

export default OpenGraphHead;
