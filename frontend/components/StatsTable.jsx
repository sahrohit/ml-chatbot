import {
	Flex,
	Text,
	Heading,
	Stack,
	Box,
	Center,
	Icon,
} from "@chakra-ui/react";
import React from "react";
import { Bar, Doughnut, Scatter } from "react-chartjs-2";
import { FaAward } from "react-icons/fa";

const parseData = (data) => {
	let newData = [];
	for (let key in data) {
		newData.push(data[key]);
	}
	return newData;
};

const average = (array) => array.reduce((a, b) => a + b) / array.length;

const StatsTable = ({ data }) => {
	const newData = parseData(data);

	const probArray = newData.map((item) => {
		return item.probability;
	});

	const timeArray = newData.map((item) => {
		let date = new Date(item.timestamp * 1000);
		return { x: date.getHours() + date.getMinutes() / 60, y: item.probability };
	});

	const isAnswered = newData.map((item) => {
		return item.isAnswered;
	});

	const country = newData.map((item) => {
		return item.geoData.geoplugin_countryName;
	});

	const countryName = [...new Set(country)];

	const countryData = {
		labels: countryName,
		datasets: [
			{
				label: "# of Queries",
				data: countryName.map((item) => {
					return country.filter((x) => x === item).length;
				}),
				fill: false,
				backgroundColor: [
					"rgba(255, 205, 86)",
					"rgba(75, 192, 192)",
					"rgba(54, 162, 235)",
					"rgba(153, 102, 255)",
					"rgba(201, 203, 207)",
				],
				borderColor: [
					"rgb(255, 205, 86)",
					"rgb(75, 192, 192)",
					"rgb(54, 162, 235)",
					"rgb(153, 102, 255)",
					"rgb(201, 203, 207)",
				],
			},
		],
	};

	const timeData = {
		datasets: [
			{
				label: "Time vs Proability",
				data: timeArray,
				backgroundColor: "#48BB78",
			},
		],
	};

	const countryOptions = {
		type: "bar",
		data: countryData,
		options: {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	};

	const confidenceData = {
		labels: ["Answered", "Not Answered"],
		datasets: [
			{
				data: [
					isAnswered.filter(Boolean).length,
					isAnswered.length - isAnswered.filter(Boolean).length,
				],
				backgroundColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)"],
				hoverOffset: 4,
			},
		],
	};

	const confidenceOptions = {
		type: "doughnut",
		data: confidenceData,
	};

	return (
		<>
			<Flex
				width="70%"
				direction="row"
				flexWrap="wrap"
				alignItems="center"
				justifyContent="space-around"
				textAlign="center"
			>
				<Stack p={5}>
					<Heading
						color="gray.500"
						size="lg"
						fontSize="120px"
						fontWeight="medium"
					>
						{isAnswered.filter(Boolean).length}
					</Heading>
					<Text>
						Question Answered out of <strong>{isAnswered.length}</strong>
					</Text>
				</Stack>
				<Stack p={5}>
					<Heading
						color={
							average(probArray).toFixed(2) > 0.75 ? "green.400" : "red.500"
						}
						size="lg"
						fontSize="120px"
						fontWeight="medium"
					>
						{average(probArray).toFixed(2)}
					</Heading>
					<Text>
						Average Confidence&nbsp;
						<Icon as={FaAward} />
					</Text>
				</Stack>
			</Flex>
			<Box px={20} py={20} mt={20}>
				<Center>
					<Heading color="gray.500" size="3xl" mb={10}>
						Queries based on Country
					</Heading>
				</Center>

				<Box>
					<Bar
						width={100}
						height={50}
						data={countryData}
						options={countryOptions}
					/>
				</Box>
			</Box>

			<Box px={20} py={20} mt={20} width="65%">
				<Center>
					<Heading color="gray.500" size="3xl" mb={10}>
						Answered ?
					</Heading>
				</Center>
				<Box mx="8rem">
					<Doughnut
						width={100}
						height={50}
						data={confidenceData}
						options={confidenceOptions}
					/>
				</Box>
			</Box>

			<Box px={20} py={20} mt={20}>
				<Center>
					<Heading color="gray.500" size="3xl" mb={10}>
						Confidence based on Time
					</Heading>
				</Center>

				<Box>
					<Scatter width={100} height={50} data={timeData} />
				</Box>
			</Box>
		</>
	);
};

export default StatsTable;
