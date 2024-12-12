import protectWithSession from '@/app/config/authProtection/protectWithSession';
import ClientAppLayout from '@/components/layout/ClientLayout/ClientAppLayout';
import { Container } from '@mantine/core';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
	return (
		<ClientAppLayout>
			<>
				<Container size='lg' p='xs' mt={50}></Container>
			</>
		</ClientAppLayout>
	);
};

export default protectWithSession(HomePage);
