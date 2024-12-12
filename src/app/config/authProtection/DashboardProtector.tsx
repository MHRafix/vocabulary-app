import { Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import { ComponentType, FC, useEffect } from 'react';
import { useGetSession } from '../logic/getSession';

const DashboardProtectorWithSession = <P extends object>(
	Component: ComponentType<P>
): FC<P> => {
	const WithAdminAuthenticationRequired: FC<P> = (props) => {
		const router = useRouter();
		const { isLoading, user } = useGetSession();

		useEffect(() => {
			if (user?.role === 'LEARNER' && !isLoading) {
				router.push('/lessons');
			} else if (user == null && !isLoading) {
				router.push(`/auth/login?callback=${router?.asPath}`);
			}
		}, [user, isLoading]);

		if (isLoading || user == null) {
			return (
				<div className='flex justify-center w-full h-screen items-center'>
					<Loader color='violet' size='xl' />
				</div>
			);
		}

		return <Component {...props} />;
	};

	return WithAdminAuthenticationRequired;
};

export default DashboardProtectorWithSession;
