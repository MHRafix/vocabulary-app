import { IAuthPayload } from '@/pages/auth/register';
import { AxiosInstance } from 'axios';
import httpReq from '../http';
import { IUser } from '../model/user.model';

class AuthenticationApiRepository {
	constructor(private httpReq: AxiosInstance) {}

	/**
	 * get single user api
	 * @param id string
	 * @returns
	 */
	getUser(id: string) {
		return this.httpReq.get<IUser>(`/authentication/${id}`);
	}

	/**
	 * get all user api
	 * @returns
	 */
	async getUsers() {
		const res = await this.httpReq.get<IUser[]>(`/authentication/users`);
		return res?.data;
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

	/**
	 *  update user role api
	 * @param id string
	 * @param payload
	 * @returns
	 */
	userUpdateRole(id: string, payload: { role: 'LEARNER' | 'ADMIN' }) {
		return this.httpReq.patch(`/authentication/${id}`, payload);
	}
}

const authenticationApiRepository = new AuthenticationApiRepository(httpReq);
export default authenticationApiRepository;
