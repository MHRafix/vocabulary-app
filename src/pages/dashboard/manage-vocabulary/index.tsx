import { ILesson } from '@/app/api/model/lesson.model';
import { IState } from '@/app/api/model/others.model';
import { IVocabulary } from '@/app/api/model/vocabulary.model';
import vocabularyApiRepository from '@/app/api/repositories/vocabulary.repo';
import DashboardProtectorWithSession from '@/app/config/authProtection/DashboardProtector';
import DataTable from '@/components/common/Table/DataTable';
import DashboardLayout from '@/components/custom/dashboard/DashboardLayout';
import { Button, Menu, Text } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import {
	IconCheck,
	IconPencil,
	IconPlus,
	IconTrash,
	IconX,
} from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { NextPage } from 'next';
import { useMemo } from 'react';

const ManageVocabulary: NextPage = () => {
	// states controls
	const [state, setState] = useSetState<IState>({
		modalOpened: false,
		operationType: 'create',
		operationId: null,
		operationPayload: {},
	});

	// get all vocabulary
	const {
		data,
		isLoading,
		refetch: onRefetch,
		isRefetching,
	} = useQuery({
		queryKey: ['all_vocabularies'],
		queryFn: async () => await vocabularyApiRepository.getVocabularies(),
	});

	// create a new vocabulary
	const { mutate: createVocabulary, isPending: __creatingVocabulary } =
		useMutation({
			mutationKey: ['create_vocabulary'],
			mutationFn: async (payload: IVocabulary) =>
				await vocabularyApiRepository.createVocabulary(payload),
			onSuccess() {
				showNotification({
					title: 'Vocabulary created successfully.',
					color: 'teal',
					icon: <IconCheck size={16} />,
					message: '',
				});
				onRefetch();
			},
			onError(error) {
				showNotification({
					title: 'Failed to create new vocabulary.',
					color: 'red',
					icon: <IconX size={16} />,
					message: error?.message,
				});
			},
		});

	// update a vocabulary
	const { mutate: updateVocabulary, isPending: __updatingVocabulary } =
		useMutation({
			mutationKey: ['update_vocabulary'],
			mutationFn: async ({
				id,
				payload,
			}: {
				id: string;
				payload: IVocabulary;
			}) => await vocabularyApiRepository.updateVocabulary(id, payload),
			onSuccess() {
				showNotification({
					title: 'Vocabulary updated successfully.',
					color: 'teal',
					icon: <IconCheck size={16} />,
					message: '',
				});
				onRefetch();
			},
			onError(error) {
				showNotification({
					title: 'Failed to update new vocabulary.',
					color: 'red',
					icon: <IconX size={16} />,
					message: error?.message,
				});
			},
		});

	// delete a vocabulary
	const { mutate: deleteVocabulary, isPending: __deletingVocabulary } =
		useMutation({
			mutationKey: ['delete_vocabulary'],
			mutationFn: async (id: string) =>
				await vocabularyApiRepository.deleteVocabulary(id),
			onSuccess() {
				showNotification({
					title: 'Vocabulary removed successfully.',
					color: 'teal',
					icon: <IconCheck size={16} />,
					message: '',
				});
				onRefetch();
			},
			onError(error) {
				showNotification({
					title: 'Failed to remove new vocabulary.',
					color: 'red',
					icon: <IconX size={16} />,
					message: error?.message,
				});
			},
		});

	// table rows and columns
	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => [
			{
				accessorKey: 'word',
				header: 'Word',
			},
			{
				accessorKey: 'meaning',
				header: 'Meaning',
			},
			{
				accessorKey: 'pronunciation',
				header: 'Pronunciation',
			},
			{
				accessorKey: 'whenToSay',
				header: 'When to Say',
			},
			{
				accessorKey: 'lessonNo.title',
				header: 'Lesson No',
				accessorFn: (row: IVocabulary) => (
					<Text>{`${row?.lessonNo?.title} - ${row?.lessonNo?.number}`}</Text>
				),
			},
			{
				accessorKey: 'adminEmail',
				header: 'Admin Email',
			},
		],
		[]
	);

	return (
		<DashboardLayout title='Manage Vocabulary'>
			<DataTable
				tableTitle='Manage Vocabularies'
				columns={columns}
				data={data ?? []}
				refetch={onRefetch}
				totalCount={data?.length!}
				RowActionMenu={(row: ILesson) => (
					<>
						<Menu.Item
							onClick={() => {
								setState({
									modalOpened: true,
									operationPayload: row,
									operationType: 'update',
									operationId: row?._id,
								});
							}}
							icon={<IconPencil size={18} />}
							color='violet'
						>
							Edit
						</Menu.Item>
						<Menu.Item
							// onClick={() => {
							// 	setState({
							// 		modalOpened: true,
							// 		operationPayload: row,
							// 		operationType: 'update',
							// 		operationId: row?._id,
							// 	});
							// }}
							icon={<IconTrash size={18} />}
							color='red'
						>
							Remove
						</Menu.Item>
					</>
				)}
				ActionArea={
					<>
						<Button
							color='violet'
							variant='light'
							leftIcon={<IconPlus size={16} />}
							onClick={() =>
								setState({
									modalOpened: true,
									operationType: 'create',
									operationId: null,
									operationPayload: null,
								})
							}
							size='sm'
						>
							Add new
						</Button>
					</>
				}
				loading={isLoading || isRefetching}
			/>
		</DashboardLayout>
	);
};

export default DashboardProtectorWithSession(ManageVocabulary);
