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
	IconButton,
	useColorMode,
	Icon,
	Stack,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";

import { motion, AnimatePresence } from "framer-motion";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { FaHome } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { AiFillApi } from "react-icons/ai";

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

	return date.getHours() > 12
		? date.getHours() - 12 + ":" + date.getMinutes()
		: date.getHours() + ":" + date.getMinutes();
};

const isPM = (timestamp) => {
	return new Date(timestamp * 1000).getHours() > 12 ? true : false;
};

const LogsTable = ({ data }) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const newData = parseData(data);
	const MotionBox = motion(Box);
	const router = useRouter();

	const isXL = useBreakpointValue({
		base: false,
		sm: false,
		md: false,
		lg: false,
		xl: true,
	});

	const TableColumn = () => {
		return (
			<Tr>
				<Th>Time</Th>
				<Th>Query</Th>
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
		<>
			<Box
				width={isXL ? `auto` : `99%`}
				m="5"
				border="1px"
				p="5"
				borderRadius="12px"
				borderColor={colorMode == "light" ? `gray.200` : `whiteAlpha.300`}
				overflowX="auto"
				overflowY="hidden"
			>
				<Table size="sm" overscroll="-moz-initial">
					<Thead>
						<TableColumn />
					</Thead>
					<Tbody>
						{newData.map((item) => {
							return (
								<Tr key={item.timestamp}>
									<Td>
										<Stack direction="row">
											<Icon as={isPM(item.timestamp) ? MoonIcon : SunIcon} />
											<Text>{formatTimestamp(item.timestamp)}</Text>
										</Stack>
									</Td>
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
												placement="top"
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
			</Box>{" "}
			<AnimatePresence exitBeforeEnter={true} onExitComplete={() => null}>
				<MotionBox
					position="absolute"
					top={{ base: 10, lg: 5, xl: 20 }}
					right={{ base: 10, lg: 5, xl: 20 }}
					drag
					dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
					dragElastic={0.2}
					dragTransition={{ bounceStiffness: 1000, bounceDamping: 10 }}
					onDrag={(_event, info) => {
						console.log(info.point.x, info.point.y);
						if (info.point.y > 300) {
							toggleColorMode();
						}
					}}
				>
					<Tooltip label="Drag me down" closeOnClick={false} placement="top">
						<IconButton
							variant="nooutline"
							colorScheme="teal"
							aria-label="Toggle Light Mode"
							icon={colorMode == "light" ? <MoonIcon /> : <SunIcon />}
						/>
					</Tooltip>
				</MotionBox>
			</AnimatePresence>
			<AnimatePresence exitBeforeEnter={true} onExitComplete={() => null}>
				<Stack
					direction="row"
					position="absolute"
					top={{ base: 10, lg: 5, xl: 20 }}
					left={{ base: 10, lg: 5, xl: 20 }}
				>
					<MotionBox
						drag
						dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
						dragElastic={0.2}
						dragTransition={{ bounceStiffness: 1000, bounceDamping: 10 }}
					>
						<Tooltip label="Home" closeOnClick={false} placement="top">
							<IconButton
								fontSize="2xl"
								variant="nooutline"
								colorScheme="teal"
								aria-label="Home"
								icon={<FaHome />}
								onClick={() => {
									router.push("/");
								}}
							/>
						</Tooltip>
					</MotionBox>
					<MotionBox
						drag
						dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
						dragElastic={0.2}
						dragTransition={{ bounceStiffness: 1000, bounceDamping: 10 }}
					>
						<Tooltip label="Stats" closeOnClick={false} placement="top">
							<IconButton
								fontSize="2xl"
								variant="nooutline"
								colorScheme="teal"
								aria-label="Toggle Light Mode"
								icon={<IoIosStats />}
								onClick={() => {
									router.push("/stats");
								}}
							/>
						</Tooltip>
					</MotionBox>
					<MotionBox
						drag
						dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
						dragElastic={0.2}
						dragTransition={{ bounceStiffness: 1000, bounceDamping: 10 }}
					>
						<Tooltip label="API" closeOnClick={false} placement="top">
							<IconButton
								as="a"
								cursor="pointer"
								fontSize="2xl"
								variant="nooutline"
								colorScheme="teal"
								aria-label="Toggle Light Mode"
								icon={<AiFillApi />}
								href="/api/logs"
							/>
						</Tooltip>
					</MotionBox>
					<MotionBox
						drag
						dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
						dragElastic={0.2}
						dragTransition={{ bounceStiffness: 1000, bounceDamping: 10 }}
					>
						<Tooltip label="Report" closeOnClick={false} placement="top">
							<IconButton
								as="a"
								cursor="pointer"
								fontSize="2xl"
								variant="nooutline"
								colorScheme="teal"
								aria-label="Toggle Light Mode"
								icon={<BsFileEarmarkPdfFill />}
								href="/Report.pdf"
							/>
						</Tooltip>
					</MotionBox>
				</Stack>
			</AnimatePresence>
		</>
	);
};

export default LogsTable;
