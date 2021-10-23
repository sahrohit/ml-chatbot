import axios from "axios";

const handler = (req, res) => {
	axios
		.get(process.env.NEXT_PUBLIC_DATABASE_URL)
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((error) => {
			res.status(404).json({ message: error });
		});
};

export default handler;
