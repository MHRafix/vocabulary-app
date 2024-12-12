import { AxiosInstance } from 'axios';
import httpReq from '../http';
import { ILesson } from '../model/lesson.model';
import { IVocabulary } from '../model/vocabulary.model';

class VocabularyApiRepository {
	constructor(private httpReq: AxiosInstance) {}

	/**
	 * Create vocabulary
	 * @param payload IVocabulary
	 * @returns IVocabulary
	 */
	createVocabulary(payload: IVocabulary) {
		return this.httpReq.post('/vocabularies/create-vocabulary', payload);
	}

	/**
	 * get all vocabulary api
	 * @returns IVocabulary[]
	 */
	async getVocabularies() {
		const res = await this.httpReq.get<IVocabulary[]>(`/vocabularies`);
		return res?.data;
	}

	/**
	 * get single vocabulary api
	 * @param id string
	 * @returns IVocabulary[]
	 */
	async getVocabulary(id: string) {
		const res = await this.httpReq.get<ILesson>(`/vocabularies/${id}`);
		return res?.data;
	}

	/**
	 * update single vocabulary
	 * @param id string
	 * @param payload IVocabulary
	 * @returns boolean
	 */
	updateVocabulary(id: string, payload: IVocabulary) {
		return this.httpReq.patch(`/vocabularies/${id}`, payload);
	}

	/**
	 * delete vocabulary
	 * @param id string
	 * @returns
	 */
	deleteVocabulary(id: string) {
		return this.httpReq.delete(`/vocabularies/${id}`);
	}
}

const vocabularyApiRepository = new VocabularyApiRepository(httpReq);
export default vocabularyApiRepository;
