import { Drawer, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { PropsWithChildren } from 'react';

const DrawerWrapper: React.FC<
	PropsWithChildren<{
		opened: boolean;
		title: string;
		size: string;
		close: () => void;
	}>
> = ({ children, opened, title, close, size }) => {
	const largeScreen = useMediaQuery('(min-width: 60em)');
	return (
		<>
			<Drawer
				position='right'
				size={size}
				zIndex={999}
				opened={opened}
				onClose={close}
				title={
					<Title order={4} ff={'Nunito Sans,sans-serif'}>
						{title}
					</Title>
				}
				className='mt-[60px]  overflow-y-auto'
			>
				{children}
			</Drawer>
		</>
	);
};

export default DrawerWrapper;
