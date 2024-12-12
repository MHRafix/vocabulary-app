import authenticationApiRepository from '@/app/api/repositories/user.repo';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export const useGetSession = () => {
	const userInfo = Cookies.get('user') && JSON.parse(Cookies.get('user')!);

	const {
		data,
		isLoading,
		refetch: onRefetch,
	} = useQuery({
		queryKey: ['todos'],
		queryFn: async () =>
			await authenticationApiRepository.getLoggedUser(userInfo?._id),
		enabled: Boolean(userInfo?._id),
	});

	return { user: data?.data, isLoading, onRefetch };
};
