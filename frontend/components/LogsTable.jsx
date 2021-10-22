import React from "react";

import {
	Table,
	Thead,
	Th,
	Tr,
	Td,
	Tbody,
	Tfoot,
	Box,
	Image,
	Tooltip,
	Center,
	Tag,
} from "@chakra-ui/react";

const parseData = (data) => {
	let newData = [];
	for (let key in data) {
		newData.push(data[key]);
	}

	return newData.sort((a, b) =>
		b.timestamp > a.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
	);
};

const formatTimestamp = (timestamp) => {
	let date = new Date(timestamp * 1000);

	return date.getHours() + ":" + date.getMinutes();
};

const LogsTable = ({ data }) => {
	const newData = parseData(data);

	const TableColumn = () => {
		return (
			<Tr>
				<Th>Time</Th>
				<Th>Question</Th>
				<Th>Response</Th>
				<Th isNumeric>Confidence</Th>
				<Th>Answered?</Th>
				<Th>Probable Answer</Th>
				<Th>City</Th>
				<Th>Country</Th>
			</Tr>
		);
	};

	return (
		<Box m="5" border="1px" borderColor="gray.200" p="5" borderRadius="10">
			<Table size="sm">
				<Thead>
					<TableColumn />
				</Thead>
				<Tbody>
					{newData.map((item) => {
						return (
							<Tr key={item.timestamp}>
								<Td>{formatTimestamp(item.timestamp)}</Td>
								<Td>{item.question}</Td>
								<Td>{item.response}</Td>
								<Td isNumeric>{item.probability.toFixed(4)}</Td>
								<Td>
									<Center>
										<Tag colorScheme={item.isAnswered ? `green` : `red`}>
											{item.isAnswered ? `Yes` : `No`}
										</Tag>
									</Center>
								</Td>
								<Td>{item?.probableAnswer}</Td>
								<Td>{item.geoData.geoplugin_city}</Td>
								<Td>
									<Center>
										<Tooltip
											label={item.geoData.geoplugin_countryName}
											placement="top-end"
											hasArrow
										>
											<Image
												width="8"
												src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${item.geoData.geoplugin_countryCode}.svg`}
												alt="flag"
											/>
										</Tooltip>
									</Center>
								</Td>
							</Tr>
						);
					})}
				</Tbody>
				<Tfoot>
					<TableColumn />
				</Tfoot>
			</Table>
		</Box>
	);
};

export default LogsTable;
