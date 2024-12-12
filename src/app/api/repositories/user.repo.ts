import { IAuthPayload } from '@/pages/auth/register';
import { AxiosInstance } from 'axios';
import httpReq from '../http';
import { IUser } from '../model/user.model';

class AuthenticationApiRepository {
	constructor(private httpReq: AxiosInstance) {}

	/**
	 * logged user api
	 * @param payload
	 * @returns
	 */
	getLoggedUser(id: string) {
		return this.httpReq.get<IUser>(`/authentication/${id}`);
	}

	/**
	 * user login api
	 * @param payload
	 * @returns
	 */
	userLogin(payload: IAuthPayload) {
		return this.httpReq.post<{ token: string; _id: string }>(
			`/authentication/signin`,
			payload
		);
	}

	/**
	 * user signup api
	 * @param payload
	 * @returns
	 */
	userRegister(payload: IAuthPayload) {
		return this.httpReq.post<{ token: string; _id: string }>(
			`/authentication/signup`,
			payload
		);
	}
}

const authenticationApiRepository = new AuthenticationApiRepository(httpReq);
export default authenticationApiRepository;
