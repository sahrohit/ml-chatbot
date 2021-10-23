const handler = (_req, res) => {
	res.status(200).json({
		message:
			"Server's is actually working. If you are having issues, it your fault. Now get back there and fix it.",
	});
};

export default handler;
