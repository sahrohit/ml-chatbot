import React from "react";
import { Heading, Box, Flex, Text } from "@chakra-ui/react";
import LogsTable from "../components/LogsTable";
import axios from "axios";

const LogPage = ({ data }) => {
	return (
		<Flex direction="column" justifyContent="center" alignItems="center">
			<Box mt="10em" mb="5em" textAlign="center">
				<Heading size="2xl" m="5">
					Log Table
				</Heading>
				<Text fontSize="xl">Collection of all the Queries</Text>
			</Box>
			{data && <LogsTable data={data} />}
		</Flex>
	);
};

export default LogPage;

export const getServerSideProps = async (req, res) => {
	return axios
		.get(process.env.NEXT_PUBLIC_DATABASE_URL)
		.then((response) => {
			return {
				props: { data: response.data },
			};
		})
		.catch((error) => {
			console.log(error);
			return {
				notFound: true,
			};
		});
};
