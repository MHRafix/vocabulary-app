import { ILesson } from '@/app/api/model/lesson.model';
import { IState } from '@/app/api/model/others.model';
import lessonApiRepository from '@/app/api/repositories/lesson.repo';
import DashboardProtectorWithSession from '@/app/config/authProtection/DashboardProtector';
import DrawerWrapper from '@/components/common/Drawer/DrawerWrapper';
import DataTable from '@/components/common/Table/DataTable';
import DashboardLayout from '@/components/custom/dashboard/DashboardLayout';
import LessonForm from '@/components/custom/dashboard/manage-lesson/LessonForm';
import { Button, Menu, Text } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { modals } from '@mantine/modals';
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

const ManageLessons: NextPage = () => {
	// states controls
	const [state, setState] = useSetState<IState>({
		modalOpened: false,
		operationType: 'create',
		operationId: null,
		operationPayload: {},
	});

	// get all lessons
	const {
		data,
		isLoading,
		refetch: onRefetch,
		isRefetching,
	} = useQuery({
		queryKey: ['lessons'],
		queryFn: async () => await lessonApiRepository.getLessons(),
	});

	// create a new lesson
	const { mutate: createLesson, isPending: __creatingLesson } = useMutation({
		mutationKey: ['create_lesson'],
		mutationFn: async (payload: ILesson) =>
			await lessonApiRepository.createLesson(payload),
		onSuccess() {
			setState({
				modalOpened: false,
				operationId: null,
				operationPayload: null,
			});
			showNotification({
				title: 'Lesson created successfully.',
				color: 'teal',
				icon: <IconCheck size={16} />,
				message: '',
			});
			onRefetch();
		},
		onError(error) {
			showNotification({
				title: 'Failed to create new lesson.',
				color: 'red',
				icon: <IconX size={16} />,
				message: error?.message,
			});
		},
	});

	// update a lesson
	const { mutate: updateLesson, isPending: __updatingLesson } = useMutation({
		mutationKey: ['update_lesson'],
		mutationFn: async ({ id, payload }: { id: string; payload: ILesson }) =>
			await lessonApiRepository.updateLesson(id, payload),
		onSuccess() {
			setState({
				modalOpened: false,
				operationId: null,
				operationPayload: null,
			});
			showNotification({
				title: 'Lesson updated successfully.',
				color: 'teal',
				icon: <IconCheck size={16} />,
				message: '',
			});
			onRefetch();
		},
		onError(error) {
			showNotification({
				title: 'Failed to update new lesson.',
				color: 'red',
				icon: <IconX size={16} />,
				message: error?.message,
			});
		},
	});

	// delete a lesson
	const { mutate: deleteLesson, isPending: __deletingLesson } = useMutation({
		mutationKey: ['delete_lesson'],
		mutationFn: async (id: string) =>
			await lessonApiRepository.deleteLesson(id),
		onSuccess() {
			showNotification({
				title: 'Lesson removed successfully.',
				color: 'teal',
				icon: <IconCheck size={16} />,
				message: '',
			});

			onRefetch();
		},
		onError(error) {
			showNotification({
				title: 'Failed to remove new lesson.',
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
				accessorKey: 'title',
				header: 'Name',
			},
			{
				accessorKey: 'number',
				header: 'Number',
			},
			{
				accessorKey: 'vocabularyCount',
				header: 'Vocabulary Count',
			},
		],
		[]
	);

	return (
		<DashboardLayout title='Manage Lesson'>
			<DataTable
				tableTitle='Manage Lesson'
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
							onClick={() =>
								modals.openConfirmModal({
									title: 'Please confirm your action',
									children: (
										<Text size='sm'>
											Are sure to delete this lesson? Please click one of these
											buttons to proceed.
										</Text>
									),
									cancelProps: { color: 'red' },
									confirmProps: { color: 'violet' },
									labels: { confirm: 'Yes', cancel: 'No' },
									onCancel: () => {},
									onConfirm: () => deleteLesson(row?._id!),
								})
							}
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
							size='md'
						>
							Add new
						</Button>
					</>
				}
				loading={
					isLoading ||
					isRefetching ||
					__deletingLesson ||
					__updatingLesson ||
					__creatingLesson
				}
			/>

			<DrawerWrapper
				opened={state.modalOpened}
				title='Create or update lesson'
				size='lg'
				close={() =>
					setState({
						modalOpened: false,
					})
				}
			>
				<LessonForm
					isPending={__creatingLesson || __updatingLesson}
					state={state}
					createLesson={createLesson}
					updateLesson={updateLesson}
				/>
			</DrawerWrapper>
		</DashboardLayout>
	);
};

export default DashboardProtectorWithSession(ManageLessons);
