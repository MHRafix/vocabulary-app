import { ILesson } from '@/app/api/model/lesson.model';
import { IState } from '@/app/api/model/others.model';
import lessonApiRepository from '@/app/api/repositories/lesson.repo';
import { useGetSession } from '@/app/config/logic/getSession';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Loader, Select } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface IVocabularyFormProps {
	isPending: boolean;
	state: IState;
	createVocabulary: (state: any) => void;
	updateVocabulary: (state: { id: string; payload: any }) => void;
}

const VocabularyForm: React.FC<IVocabularyFormProps> = ({
	isPending,
	state,
	createVocabulary,
	updateVocabulary,
}) => {
	const { user } = useGetSession();

	// get all lessons
	const { data, isLoading } = useQuery({
		queryKey: ['lessons_for_dropdown'],
		queryFn: async () => await lessonApiRepository.getLessons(),
	});

	// vocabulary form
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		watch,
	} = useForm<IFormState>({
		resolver: yupResolver(Vocabulary_Form_Validation_Schema),
	});

	// prefill the form
	useEffect(() => {
		setValue('word', state?.operationPayload?.word);
		setValue('meaning', state?.operationPayload?.meaning);
		setValue('pronunciation', state?.operationPayload?.pronunciation);
		setValue('whenToSay', state?.operationPayload?.whenToSay);
		setValue('lessonNo', state?.operationPayload?.lessonNo);
	}, [state.operationId, state.operationPayload, state.operationType]);

	// submit form
	const handleVocabularyForm = (payload: IFormState) => {
		if (state?.operationType === 'create') {
			createVocabulary({ ...payload, adminEmail: user?.email });
		} else {
			updateVocabulary({
				id: state?.operationId!,
				payload: { ...payload, adminEmail: user?.email },
			});
		}
	};
	return (
		<form onSubmit={handleSubmit(handleVocabularyForm)}>
			<Input.Wrapper
				label='Vocabulary word'
				my={10}
				size='md'
				error={<ErrorMessage errors={errors} name='word' />}
			>
				<Input
					disabled={isPending}
					{...register('word')}
					placeholder='Word'
					size='md'
					variant='filled'
					style={{
						fontFamily: 'Nunito sans, sans-serif !important',
					}}
				/>
			</Input.Wrapper>
			<Input.Wrapper
				label='Vocabulary meaning'
				my={10}
				size='md'
				error={<ErrorMessage errors={errors} name='meaning' />}
			>
				<Input
					disabled={isPending}
					placeholder='Meaning'
					size='md'
					variant='filled'
					{...register('meaning')}
				/>
			</Input.Wrapper>

			<Input.Wrapper
				label='Vocabulary pronunciation'
				my={10}
				size='md'
				error={<ErrorMessage errors={errors} name='pronunciation' />}
			>
				<Input
					disabled={isPending}
					{...register('pronunciation')}
					placeholder='Pronunciation'
					size='md'
					variant='filled'
					style={{
						fontFamily: 'Nunito sans, sans-serif !important',
					}}
				/>
			</Input.Wrapper>
			<Input.Wrapper
				label='When to say'
				my={10}
				size='md'
				error={<ErrorMessage errors={errors} name='whenToSay' />}
			>
				<Input
					disabled={isPending}
					placeholder='When to say'
					size='md'
					variant='filled'
					{...register('whenToSay')}
				/>
			</Input.Wrapper>

			<Input.Wrapper
				label='Select lesson'
				my={10}
				size='md'
				error={<ErrorMessage errors={errors} name='lessonNo' />}
			>
				<Select
					disabled={isPending || isLoading}
					rightSection={isLoading ? <Loader size={'xs'} /> : null}
					data={getSelectItems(data!)}
					onChange={(e) => setValue('lessonNo', e!)}
					placeholder='Pick a lesson'
					size='md'
					variant='filled'
					style={{
						fontFamily: 'Nunito sans, sans-serif !important',
					}}
					value={watch('lessonNo')}
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

export default VocabularyForm;

export const Vocabulary_Form_Validation_Schema = Yup.object().shape({
	word: Yup.string().required().label('word'),
	meaning: Yup.string().required().label('meaning'),
	pronunciation: Yup.string().required().label('pronunciation'),
	whenToSay: Yup.string().required().label('whenToSay'),
	lessonNo: Yup.string().required().label('lessonNo'),
});
export interface IFormState {
	word: string;
	meaning: string;
	pronunciation: string;
	whenToSay: string;
	lessonNo: string;
}

// make dropdown items
const getSelectItems = (data: ILesson[]) => {
	let items: { label: string; value: string }[] = [];

	data?.map((item) =>
		items.push({
			label: item?.title!,
			value: item?._id!,
		})
	);
	return items;
};
