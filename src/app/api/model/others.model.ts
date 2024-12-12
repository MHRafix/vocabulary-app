export interface IState {
	modalOpened: boolean;
	operationType: 'create' | 'update';
	operationId?: string | null;
	operationPayload?: any;
	status?: any;
}
