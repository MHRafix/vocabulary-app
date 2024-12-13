import { ILesson } from '@/app/api/model/lesson.model';
import { IState } from '@/app/api/model/others.model';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, NumberInput } from '@mantine/core';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface ILessonFormProps {
	isPending: boolean;
	state: IState;
	createLesson: (state: ILesson) => void;
	updateLesson: (state: { id: string; payload: ILesson }) => void;
}
const LessonForm: React.FC<ILessonFormProps> = ({
	isPending,
	state,
	createLesson,
	updateLesson,
}) => {
	// lesson form
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		watch,
	} = useForm<IFormState>({
		resolver: yupResolver(Lesson_Form_Validation_Schema),
	});

	// prefill the form
	useEffect(() => {
		setValue('title', state?.operationPayload?.title);
		setValue('number', state?.operationPayload?.number);
	}, [state.operationId, state.operationPayload, state.operationType]);

	// submit form
	const handleLessonForm = (payload: IFormState) => {
		if (state?.operationType === 'create') {
			createLesson(payload);
		} else {
			updateLesson({ id: state?.operationId!, payload });
		}
	};
	return (
		<form onSubmit={handleSubmit(handleLessonForm)}>
			<Input.Wrapper
				label='Lesson title'
				my={10}
				size='md'
				error={<ErrorMessage errors={errors} name='title' />}
			>
				<Input
					disabled={isPending}
					{...register('title')}
					placeholder='Lesson title'
					size='md'
					variant='filled'
					style={{
						fontFamily: 'Nunito sans, sans-serif !important',
					}}
				/>
			</Input.Wrapper>
			<Input.Wrapper
				label='Lesson number'
				my={10}
				size='md'
				error={<ErrorMessage errors={errors} name='number' />}
			>
				<NumberInput
					disabled={isPending}
					placeholder='Lesson number (unique)'
					size='md'
					variant='filled'
					onChange={(e) => setValue('number', parseInt(e as string))}
					value={watch('number')}
				/>
			</Input.Wrapper>
			<Button
				type='submit'
				color='violet'
				size='md'
				loading={isPending}
				fullWidth
				mt={10}
			>
				Save
			</Button>
		</form>
	);
};

export default LessonForm;

export const Lesson_Form_Validation_Schema = Yup.object().shape({
	title: Yup.string().required().label('Title'),
	number: Yup.number().required().label('Number'),
});

export interface IFormState {
	title: string;
	number: number;
}
