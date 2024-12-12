import { ActionIcon, Flex, Loader, Title } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import cls from 'classnames';
// import { mkConfig } from 'export-to-csv';
import {
	MRT_ColumnDef,
	MantineReactTable,
	useMantineReactTable,
} from 'mantine-react-table';
import React, { useEffect, useState } from 'react';

interface Prop {
	columns: MRT_ColumnDef<any>[];
	data: any[];
	refetch: () => void;
	totalCount: number;
	loading: boolean;
	isExportPDF?: boolean;
	ActionArea?: React.ReactNode;
	tableTitle: string;
	RowActionMenu?: (row: any) => React.ReactNode;
}

// const csvConfig = mkConfig({
// 	fieldSeparator: ',',
// 	decimalSeparator: '.',
// 	useKeysAsHeaders: true,
// });

const DataTable: React.FC<Prop> = ({
	columns,
	loading,
	data,
	refetch,
	ActionArea,
	RowActionMenu,
	totalCount,
	tableTitle,
}) => {
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 100,
	});
	const [sorting, setSorting] = useState<any[]>([]);
	const [columnFilters, setColumnFilters] = useState<any[]>([]);

	useEffect(() => {
		refetch();
	}, [pagination.pageIndex, pagination.pageSize, sorting, columnFilters]);

	// const exportCSV = () => {
	// 	const csv = generateCsv(csvConfig)(data);
	// 	downloadCsvFile(csvConfig)(csv);
	// };

	// const handleExportRows = (rows: MRT_Row<IAttendance>[]) => {
	// 	const doc = new jsPDF();
	// 	const tableData = rows.map((row) => Object.values(row.original));
	// 	const tableHeaders = columns.map((c) => c.header);

	// 	autoTable(doc, {
	// 		head: [tableHeaders],
	// 		body: tableData,
	// 	});

	// 	doc.save('mrt-pdf-example.pdf');
	// };

	const table = useMantineReactTable({
		columns,
		data,
		columnFilterDisplayMode: 'popover',

		state: {
			// showProgressBars: loading,
			pagination,
			sorting,
		},
		rowCount: totalCount,

		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,

		enableRowSelection: false,
		enableColumnOrdering: false,
		enableGlobalFilter: true,
		enableRowNumbers: true,

		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,

		paginationDisplayMode: 'pages',
		initialState: {
			showGlobalFilter: true,
			showColumnFilters: true,
			density: 'xs',
		},
		enableRowActions: RowActionMenu ? true : false,
		positionActionsColumn: 'last',
		renderRowActionMenuItems: (_row: any) =>
			RowActionMenu?.(_row?.row?.original),
		renderTopToolbar: () => {
			return (
				<div className='flex justify-between items-center px-2 py-5 mb-5'>
					<Title order={2} fw={700}>
						{tableTitle}
					</Title>
					<Flex gap={'md'} justify={'space-between'} align={'center'}>
						{loading ? (
							<Loader size={'lg'} color='violet' />
						) : (
							<ActionIcon
								onClick={() => refetch()}
								variant='outline'
								radius={100}
								size={45}
							>
								<IconRefresh
									size={35}
									className={cls({ 'animate-reverse-spin': loading })}
								/>
							</ActionIcon>
						)}

						{ActionArea}
					</Flex>
				</div>
			);
		},
	});

	return (
		<>
			<div className='p-3'>
				<MantineReactTable table={table} />
			</div>
		</>
	);
};

export default DataTable;
