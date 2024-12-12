import ClientAppLayout from '@/components/layout/ClientLayout/ClientAppLayout';
import { Container } from '@mantine/core';
import { NextPage } from 'next';

const TripsPage: NextPage = () => {
	return (
		<ClientAppLayout backIcon={true}>
			<Container size='lg' p='sm' mb={100}>
				<div className='h-[27vh]'>Trips page...........</div>
			</Container>
		</ClientAppLayout>
	);
};

export default TripsPage;
