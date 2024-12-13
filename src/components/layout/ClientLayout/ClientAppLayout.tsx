import { AppShell } from '@mantine/core';
import Head from 'next/head';
import React from 'react';
import ClientFooter from './ClientFooter';
import { ClientHeader } from './ClientHeader';

const ClientAppLayout: React.FC<{
	title: string;
	children: JSX.Element;
}> = ({ title, children }) => {
	return (
		<div>
			<Head>
				<title>Asia admin - {title ? title : 'Dashboard'}</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
			<AppShell
				header={<ClientHeader />}
				styles={(theme) => ({
					main: {
						backgroundColor:
							theme.colorScheme === 'dark'
								? theme.colors.dark[8]
								: theme.colors.gray[0],
						padding: '0px',
					},
				})}
				footer={<ClientFooter />}
			>
				<main>{children}</main>
			</AppShell>
		</div>
	);
};

export default ClientAppLayout;
