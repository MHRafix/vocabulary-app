import handleUserDestination from '@/app/config/authProtection/handleUserDestination';
import { Loader } from '@mantine/core';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
	return (
		<div className='flex justify-center items-center h-screen'>
			<Loader color='violet' size={'xl'} />
		</div>
	);
};

export default handleUserDestination(HomePage);
