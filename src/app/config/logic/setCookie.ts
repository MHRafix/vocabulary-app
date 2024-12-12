import Cookies from 'js-cookie';

export const storeUserId = (id: string) => {
	Cookies.set('userId', JSON.stringify(id), {
		expires: 30,
		secure: true,
		domain: '',
		path: '',
	});
};
