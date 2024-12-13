import { ILesson } from './lesson.model';

export interface IVocabulary {
	word: string;
	meaning: string;
	pronunciation: string;
	whenToSay: string;
	lessonNo: ILesson;
	adminEmail: string;
}
export interface IVocabularyWithPagination {
	total: number;
	hasNext: boolean;
	vocabularies: IVocabulary[];
}
