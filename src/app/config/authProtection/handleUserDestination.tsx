import { useRouter } from 'next/router';
import { ComponentType, FC, useEffect } from 'react';
import { useGetSession } from '../logic/getSession';

const handleUserDestination = <P extends object>(
	Component: ComponentType<P>
): FC<P> => {
	const WithAuthenticationRequired: FC<P> = (props) => {
		const router = useRouter();
		const { isLoading, user } = useGetSession();

		useEffect(() => {
			if (user?.role === 'ADMIN' && !isLoading) {
				router.push('/dashboard/manage-lesson');
			} else if (user?.role === 'LEARNER' && !isLoading) {
				router.push('/lessons');
			} else if (user == null && !isLoading) {
				router.push(`/auth/login?callback=${router?.asPath}`);
			}
		}, [user, isLoading, router]);

		return <Component {...props} />;
	};

	return WithAuthenticationRequired;
};

export default handleUserDestination;
