import { Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import { ComponentType, FC, useEffect } from 'react';
import { useGetSession } from '../logic/getSession';

const UserProtectorWithSession = <P extends object>(
	Component: ComponentType<P>
): FC<P> => {
	const WithUserAuthenticationRequired: FC<P> = (props) => {
		const router = useRouter();
		const { isLoading, user } = useGetSession();

		useEffect(() => {
			if (user == null && !isLoading) {
				router.push(`/auth/login?callback=${router?.asPath}`);
			} else if (user?.role === 'ADMIN' && !isLoading) {
				router.push('/dashboard/manage-lesson');
			}
		}, [user, isLoading, router]);

		if (isLoading || user == null) {
			return (
				<div className='flex justify-center w-full h-screen items-center'>
					<Loader color='violet' size='xl' />
				</div>
			);
		}

		return <Component {...props} />;
	};

	return WithUserAuthenticationRequired;
};

export default UserProtectorWithSession;
