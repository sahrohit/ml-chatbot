import axios from "axios";
import { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Box,
	useColorMode,
	IconButton,
	Heading,
	Flex,
	Text,
	InputGroup,
	Icon,
	InputRightElement,
	Tooltip,
	Stack,
	useToast,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaGithub, FaRandom } from "react-icons/fa";
import randomQuestion from "../components/helpers/RandomQuestion";
import OpenGraphHead from "../components/shared/OpenGraphHead";
import { motion, AnimatePresence } from "framer-motion";
import FloatingIcon from "../components/FloatingIcon";
import { FaArchive } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { useRouter } from "next/router";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { AiFillApi } from "react-icons/ai";

const Home = () => {
	const inputRef = useRef();
	const router = useRouter();
	const toast = useToast();

	const { colorMode, toggleColorMode } = useColorMode();
	const [response, setResponse] = useState();
	const [loading, setLoading] = useState(false);

	const [messageAcknowledged, setMessageAcknowledged] = useState(false);

	const MotionBox = motion(Box);

	const handleSubmit = async () => {
		setLoading(true);
		axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`, {
				question: inputRef.current.value,
			})
			.then(function (response) {
				setResponse(response.data.answer);
				setLoading(false);
				toast.closeAll();
			})
			.catch(function (error) {
				setResponse(error);
				setLoading(false);
			});
	};

	const validateMessage = (value) => {
		let error;
		if (!value) {
			error = "Message is required";
		}
		return error;
	};

	return (
		<>
			<OpenGraphHead />

			<Flex
				height="100vh"
				justifyContent="center"
				direction="column"
				textAlign="center"
				alignItems="center"
			>
				<Flex
					height="40%"
					as="main"
					justifyContent="space-around"
					direction="column"
					textAlign="center"
					alignItems="center"
					width="80%"
				>
					<Box>
						<Heading as="h1" size="2xl">
							Chat Bot
						</Heading>
						<Text fontSize="xl">Get started by typing in the box below</Text>
					</Box>

					<Box my={50}>
						<Formik
							initialValues={{
								message: "",
							}}
							onSubmit={(_values, actions) => {
								if (!messageAcknowledged) {
									toast({
										title: "It might take a while.",
										position: "top",
										variant: "subtle",
										description: "We're spinning servers just for you.",
										status: "info",
										duration: 9000,
										isClosable: true,
									});
									setMessageAcknowledged(true);
								}

								handleSubmit();
								setTimeout(() => {
									actions.setSubmitting(false);
								}, 500);
							}}
						>
							{(props) => (
								<Form>
									<Field name="message" validate={validateMessage}>
										{({ field, form }) => (
											<FormControl
												isInvalid={form.errors.message && form.touched.message}
											>
												<FormLabel id="field-message-label" htmlFor="text">
													Message
												</FormLabel>
												<InputGroup>
													<Input
														{...field}
														id="text"
														placeholder="Message"
														ref={inputRef}
														width={{ base: "100%", lg: 400, xl: 400 }}
													/>
													<InputRightElement width="4.5rem">
														<Tooltip
															offset={[10, 10]}
															label="Try Random Question"
															placement="top"
															openDelay={1000}
														>
															<IconButton
																h="1.75rem"
																size="sm"
																icon={<Icon as={FaRandom} />}
																onClick={() => {
																	props.setFieldValue(
																		"message",
																		randomQuestion(),
																		true
																	);
																}}
															/>
														</Tooltip>
													</InputRightElement>
												</InputGroup>
												<FormErrorMessage>
													{form.errors.message}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Button
										mt={4}
										colorScheme="teal"
										isLoading={props.isSubmitting || loading}
										disabled={props.isSubmitting}
										type="submit"
									>
										Submit
									</Button>
								</Form>
							)}
						</Formik>
					</Box>
					<Box mx={10}>
						<Text
							fontSize="xl"
							textOverflow="wrap"
							style={{ opacity: response ? 100 : 0 }}
						>{`Response : ${response}`}</Text>
					</Box>
				</Flex>
			</Flex>
			<AnimatePresence exitBeforeEnter={true} onExitComplete={() => null}>
				<MotionBox
					position="fixed"
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
					position="fixed"
					top={{ base: 10, lg: 5, xl: 20 }}
					left={{ base: 10, lg: 5, xl: 20 }}
				>
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
			<FloatingIcon
				icon={<FaGithub />}
				position="fixed"
				bottom={{ base: 5, lg: 5, xl: 10 }}
				right={{ base: 5, lg: 5, xl: 10 }}
			/>
		</>
	);
};

export default Home;
