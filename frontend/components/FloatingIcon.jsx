import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, IconButton, Link } from "@chakra-ui/react";

const FloatingIcon = ({ icon, onClick, ...rest }) => {
	const scrollMoreVariants = {
		initial: {
			opacity: 0,
			y: 50,
		},
		hidden: {
			opacity: [0, 1],
			transition: {
				duration: 0.5,
				delay: 1,
				ease: "easeIn",
			},
		},
		bounce: {
			y: [0, -18, 0],
			transition: {
				duration: 1.6,
				ease: "easeInOut",
				loop: Infinity,
			},
		},
	};

	return (
		<AnimatePresence>
			<motion.div
				initial="initial"
				animate={["hidden", "bounce"]}
				variants={scrollMoreVariants}
			>
				<Link
					aria-label="Github"
					rel="noreferrer"
					href="https://github.com/sahrohit/ml-chatbot"
					target="_blank"
				>
					<Tooltip
						offset={[10, 10]}
						label="Check out Github Repo Here"
						placement="top-start"
						hasArrow
					>
						<IconButton
							{...rest}
							fontSize="30px"
							position="fixed"
							bottom={{ base: 5, lg: 5, xl: 10 }}
							right={{ base: 5, lg: 5, xl: 10 }}
							variant="nooutline"
							colorScheme="teal"
							aria-label="Toggle Light Mode"
							icon={icon}
						/>
					</Tooltip>
				</Link>
			</motion.div>
		</AnimatePresence>
	);
};

export default FloatingIcon;
