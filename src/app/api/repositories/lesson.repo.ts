import { AxiosInstance } from 'axios';
import httpReq from '../http';
import { ILesson } from '../model/lesson.model';

class LessonApiRepository {
	constructor(private httpReq: AxiosInstance) {}

	/**
	 * Create lesson
	 * @param payload ILesson
	 * @returns ILesson
	 */
	createLesson(payload: ILesson) {
		return this.httpReq.post('/lessons/create-lesson', payload);
	}

	/**
	 * get all lessons api
	 * @returns ILesson[]
	 */
	async getLessons() {
		const lessons = await this.httpReq.get<ILesson[]>(`/lessons`);
		return lessons?.data;
	}

	/**
	 * get single lesson api
	 * @param id string
	 * @returns ILesson[]
	 */
	getLesson(id: string) {
		return this.httpReq.get<ILesson>(`/lessons/${id}`);
	}

	/**
	 * update single lesson
	 * @param id string
	 * @param payload ILesson
	 * @returns boolean
	 */
	async updateLesson(id: string, payload: ILesson) {
		const res = await this.httpReq.patch<any>(`/lessons/${id}`, payload);
		return res?.data;
	}

	/**
	 * delete lesson
	 * @param id string
	 * @returns
	 */
	deleteLesson(id: string) {
		return this.httpReq.delete(`/lessons/${id}`);
	}
}

const lessonApiRepository = new LessonApiRepository(httpReq);
export default lessonApiRepository;
