import { IState } from '@/app/api/model/others.model';
import { IUser } from '@/app/api/model/user.model';
import authenticationApiRepository from '@/app/api/repositories/user.repo';
import DashboardProtectorWithSession from '@/app/config/authProtection/DashboardProtector';
import DataTable from '@/components/common/Table/DataTable';
import DashboardLayout from '@/components/custom/dashboard/DashboardLayout';
import { Avatar, Badge, Menu } from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { NextPage } from 'next';
import { useMemo } from 'react';

const ManageUser: NextPage = () => {
	// states controls
	const [state, setState] = useSetState<IState>({
		modalOpened: false,
		operationType: 'create',
		operationId: null,
		operationPayload: {},
	});

	// get all users
	const {
		data,
		isLoading,
		refetch: onRefetch,
		isRefetching,
	} = useQuery({
		queryKey: ['all_users'],
		queryFn: async () => await authenticationApiRepository.getUsers(),
	});

	// update role of user
	const { mutate: updateUserRole, isPending: __updatingUserRole } = useMutation(
		{
			mutationKey: ['update_user_role'],
			mutationFn: async ({
				id,
				role,
			}: {
				id: string;
				role: 'LEARNER' | 'ADMIN';
			}) => await authenticationApiRepository.userUpdateRole(id, { role }),
			onSuccess() {
				showNotification({
					title: 'User role updated successfully.',
					color: 'teal',
					icon: <IconCheck size={16} />,
					message: '',
				});
				onRefetch();
			},
			onError(error) {
				showNotification({
					title: 'Failed to update user role.',
					color: 'red',
					icon: <IconX size={16} />,
					message: error?.message,
				});
			},
		}
	);

	// table rows and columns
	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => [
			{
				accessorKey: 'name',
				header: 'Name',
			},
			{
				accessorKey: 'email',
				header: 'Email',
			},
			{
				accessorKey: 'avatar',
				header: 'Avatar',
				accessorFn: (row: IUser) => (
					<Avatar size={'lg'} color={'violet'} src={row?.avatar} radius={100}>
						{row?.name?.slice(0, 1).toUpperCase()}
					</Avatar>
				),
			},
			{
				accessorKey: 'role',
				header: 'Role',
				accessorFn: (row: IUser) => (
					<Menu position='right' withArrow>
						<Menu.Target>
							<div>
								<Badge
									className='cursor-pointer'
									radius={5}
									size='lg'
									py={18}
									px={20}
									variant='dot'
									color={row?.role === 'ADMIN' ? 'teal' : 'violet'}
								>
									{row?.role}
								</Badge>{' '}
							</div>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item
								c={'teal'}
								onClick={() => updateUserRole({ id: row?._id, role: 'ADMIN' })}
							>
								Admin
							</Menu.Item>
							<Menu.Item
								c={'violet'}
								onClick={() =>
									updateUserRole({ id: row?._id, role: 'LEARNER' })
								}
							>
								Learner
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				),
			},
		],
		[]
	);
	return (
		<DashboardLayout title='Manage User'>
			<DataTable
				tableTitle='Manage Users'
				columns={columns}
				data={data ?? []}
				refetch={onRefetch}
				totalCount={data?.length!}
				loading={isLoading || isRefetching || __updatingUserRole}
			/>
		</DashboardLayout>
	);
};

export default DashboardProtectorWithSession(ManageUser);
