import React from "react";
import {
	Heading,
	Box,
	Flex,
	Text,
	Tooltip,
	IconButton,
	Stack,
	useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";

import { motion, AnimatePresence } from "framer-motion";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaHome, FaArchive } from "react-icons/fa";
import StatsTable from "../components/StatsTable";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { AiFillApi } from "react-icons/ai";

const StatsPage = ({ data }) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const router = useRouter();
	const MotionBox = motion(Box);

	return (
		<>
			<Flex direction="column" justifyContent="center" alignItems="center">
				<Box mt="10em" mb="5em" textAlign="center">
					<Heading size="2xl" m="5">
						Statistics
					</Heading>
					<Text fontSize="xl">
						Numbers speak louder, but graphs have a lot more to say.
					</Text>
				</Box>
				{data && <StatsTable data={data} />}
			</Flex>
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
						<Tooltip label="Archive" closeOnClick={false} placement="top">
							<IconButton
								fontSize="2xl"
								variant="nooutline"
								colorScheme="teal"
								aria-label="Toggle Light Mode"
								icon={<FaArchive />}
								onClick={() => {
									router.push("/logs");
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

export default StatsPage;

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
