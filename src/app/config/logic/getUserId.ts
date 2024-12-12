import Cookies from 'js-cookie';

export const getUserId = () => {
	return Cookies.get('userId') && JSON.parse(Cookies.get('userId')!);
};
