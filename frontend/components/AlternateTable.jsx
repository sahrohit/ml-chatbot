import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	chakra,
	Box,
	Tag,
	Tooltip,
	Image,
	Center,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import { nanoid } from "nanoid";
import { useMemo } from "react";

const formatTimestamp = (timestamp) => {
	let date = new Date(timestamp * 1000);

	return date.getHours() + ":" + date.getMinutes();
};

const parseData = (datum) => {
	let newData = [];
	for (let key in datum) {
		newData.push(datum[key]);
	}

	return newData.sort((a, b) =>
		b.timestamp > a.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
	);
};

const DataTable = (props) => {
	const data = useMemo(() => {
		return parseData(props.data).map((item) => {
			return {
				time: formatTimestamp(item.timestamp),
				question: item.question,
				response: item.response,
				confidence: item.probability.toFixed(4),
				answered: <Tag>{item.isAnswered ? `Yes` : `No`}</Tag>,
				probableAnswer: item?.probableAnswer,
				city: item.geoData.geoplugin_city,
				country: (
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
				),
			};
		});
	}, []);

	const columns = useMemo(
		() => [
			{
				Header: "Time",
				accessor: "time",
			},
			{
				Header: "Question",
				accessor: "question",
			},
			{
				Header: "Response",
				accessor: "response",
			},
			{
				Header: "Confidence",
				accessor: "confidence",
				isNumeric: true,
			},
			{
				Header: "Answered",
				accessor: "answered",
			},
			{
				Header: "Probable Answer",
				accessor: "probableAnswer",
			},
			{
				Header: "City",
				accessor: "city",
			},
			{
				Header: "Country",
				accessor: "country",
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data }, useSortBy);

	return (
		<Box m="5" border="1px" borderColor="gray.200" p="5">
			<Table size="sm" {...getTableProps()}>
				<Thead>
					{headerGroups.map((headerGroup) => (
						<Tr key={nanoid()} {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<Th
									key={nanoid()}
									{...column.getHeaderProps(column.getSortByToggleProps())}
									isNumeric={column.isNumeric}
								>
									{column.render("Header")}
									<chakra.span pl="4">
										{column.isSorted ? (
											column.isSortedDesc ? (
												<TriangleDownIcon aria-label="sorted descending" />
											) : (
												<TriangleUpIcon aria-label="sorted ascending" />
											)
										) : (
											``
										)}
									</chakra.span>
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<Tr key={nanoid()} {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<Td
										key={nanoid()}
										{...cell.getCellProps()}
										isNumeric={cell.column.isNumeric}
									>
										<Center>{cell.render("Cell")}</Center>
									</Td>
								))}
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</Box>
	);
};

export default DataTable;
