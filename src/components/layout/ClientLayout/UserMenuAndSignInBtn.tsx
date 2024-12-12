import { IUser } from '@/app/api/model/user.model';
import { Avatar, Button, Divider, Menu, Text } from '@mantine/core';
import { IconLogin, IconLogout, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const UserMenuAndSignInBtn: React.FC<{ user: IUser }> = ({ user }) => {
	return (
		<div>
			{!user && (
				<Button
					component={Link}
					href='/auth/signin'
					rightIcon={<IconLogin size={18} />}
					fw={400}
					color='pink'
					radius={100}
				>
					Sign in
				</Button>
			)}
			{user && (
				<Menu shadow='md' width={200}>
					<Menu.Target>
						<Avatar
							className='cursor-pointer capitalize'
							size={42}
							color='teal'
							radius='xl'
							src={user?.avatar}
						>
							{user?.email.slice(0, 1)}
						</Avatar>
					</Menu.Target>

					<Menu.Dropdown>
						<div className='p-2 pb-0'>
							<Text size='md' color='#000' className='capitalize'>
								{user?.name}
							</Text>
							<Text size='sm' color='gray'>
								{user?.email}
							</Text>
						</div>
						<Divider my='sm' />
						<Menu.Item
							component={Link}
							href='/my_account/profile_settings'
							icon={<IconUser size={18} />}
						>
							Profile Settings
						</Menu.Item>

						<Menu.Item
							color='red'
							icon={<IconLogout size={18} />}
							// onClick={() =>
							// 	openConfirmModal({
							// 		title: 'Confirm your logout action',
							// 		// centered: true,
							// 		children: (
							// 			<Text size='sm'>Are you sure you want to logout.</Text>
							// 		),
							// 		labels: {
							// 			confirm: 'Logout',
							// 			cancel: 'No, Let me logged in',
							// 		},
							// 		confirmProps: { color: 'red' },
							// 		onCancel: () => {},
							// 		onConfirm: () => signOut(),
							// 	})
							// }
						>
							Logout
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			)}
		</div>
	);
};

export default UserMenuAndSignInBtn;
