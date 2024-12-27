import { Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import { ComponentType, FC, useEffect } from 'react';
import { useGetSession } from '../logic/getSession';

const protectWithoutSession = <P extends object>(
	Component: ComponentType<P>
): FC<P> => {
	const WithAuthenticationRequired: FC<P> = (props) => {
		const router = useRouter();

		const { isLoading, user } = useGetSession();

		useEffect(() => {
			if (user && !isLoading) {
				router.push('/');
			}
		}, [user, isLoading, router]);

		if (isLoading || user) {
			return (
				<div className='flex justify-center w-full h-screen items-center'>
					<Loader color='violet' size='sm' />
				</div>
			);
		}

		return <Component {...props} />;
	};

	return WithAuthenticationRequired;
};

export default protectWithoutSession;
