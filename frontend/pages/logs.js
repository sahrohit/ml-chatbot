import React, { useState, useEffect } from "react";
import { Heading, Box, Flex } from "@chakra-ui/react";
import LogsTable from "../components/LogsTable";
import AlternateTable from "../components/AlternateTable";
import axios from "axios";

const LogPage = () => {
	const [data, setData] = useState();

	useEffect(() => {
		axios
			.get(process.env.NEXT_PUBLIC_DATABASE_URL)
			.then((response) => {
				setData(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
				setData(error);
			});
		return () => {
			setData({});
		};
	}, []);

	return (
		<Flex direction="column" justifyContent="center" alignItems="center">
			<Heading mt="20" mb="5">
				Hello World
			</Heading>
			{data && <LogsTable data={data} />}
			{/* {data && <AlternateTable data={data} />} */}
		</Flex>
	);
};

export default LogPage;
