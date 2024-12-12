import { ILesson } from './lesson.model';

export interface IVocabulary {
	word: string;
	meaning: string;
	pronunciation: string;
	whenToSay: string;
	lessonNo: ILesson;
	adminEmail: string;
}
