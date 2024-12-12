import { atom } from 'jotai';

export interface ISessionUser {
	_id: string;
	name: string;
	email: string;
	role: string;
	avatar: string;
	accessToken: string;
	__typename: string;
}

export const sessionUserAtom = atom<ISessionUser | null>(null);
export const sessionUserLoadingAtom = atom(true);
