import userApiRepository from '@/app/api/repositories/user.repo';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export const useGetSession = () => {
	const userInfo = Cookies.get('user') && JSON.parse(Cookies.get('user')!);

	// get logged in user
	const {
		data,
		isLoading,
		refetch: onRefetch,
	} = useQuery({
		queryKey: ['get_logged_in_user_session'],
		queryFn: async () => await userApiRepository.getUser(userInfo?._id),
		enabled: Boolean(userInfo?._id),
	});

	return { user: data?.data, isLoading, onRefetch };
};
