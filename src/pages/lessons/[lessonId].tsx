import { IVocabulary } from '@/app/api/model/vocabulary.model';
import lessonApiRepository from '@/app/api/repositories/lesson.repo';
import vocabularyApiRepository from '@/app/api/repositories/vocabulary.repo';
import UserProtectorWithSession from '@/app/config/authProtection/userProtectorWithSession';
import ClientAppLayout from '@/components/layout/ClientLayout/ClientAppLayout';
import {
	ActionIcon,
	Button,
	Container,
	Flex,
	Group,
	Paper,
	Skeleton,
	Space,
	Text,
	Title,
} from '@mantine/core';
import {
	IconArrowLeft,
	IconArrowRight,
	IconVolume2,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const SingleLesson: NextPage = () => {
	const router = useRouter();

	const [page, setPage] = useState<number>(1);
	const [showConfetti, setShowConfetti] = useState<boolean>(false);

	const { width, height } = useWindowSize();

	// get single lesson
	const {
		data,
		isLoading,
		refetch: onRefetch,
	} = useQuery({
		queryKey: [`learner_lesson_${router?.query?.lessonId}`],
		queryFn: async () =>
			await lessonApiRepository.getLesson(router?.query?.lessonId as string),
		enabled: Boolean(router?.query?.lessonId),
	});

	// get single lesson
	const {
		data: vocabulariesData,
		isLoading: isLoadingVocabularies,
		refetch: onRefetchVocabularies,
		isRefetching,
	} = useQuery({
		queryKey: [
			`learner_lesson_vocabularies_by_lessonId_${router?.query?.lessonId}`,
		],
		queryFn: async () =>
			await vocabularyApiRepository.getVocabulariesByLessonId(
				router?.query?.lessonId as string,
				1,
				page
			),
		enabled: Boolean(router?.query?.lessonId),
	});

	// if page change api will call again
	useEffect(() => {
		onRefetchVocabularies({});
	}, [page]);

	// completed awarding
	const onComplete = () => {
		setShowConfetti(true);
		setTimeout(() => {
			setShowConfetti(false);
			router.push('/lessons');
		}, 10000);
	};

	return (
		<ClientAppLayout title='Single Lesson'>
			<Container size={'lg'}>
				<Space h={50} />
				{isLoading ? (
					<Skeleton h={50} w={200} radius={5} />
				) : (
					<Title c={'violet'} order={2} tt={'capitalize'}>
						{`${data?.title} - ${data?.number}` || 'Single Lesson Title'}
					</Title>
				)}
				<Space h={20} />
				{Boolean(isLoadingVocabularies || isRefetching) ? (
					<Skeleton h={220} radius={10} />
				) : (
					<>
						{vocabulariesData?.vocabularies?.map(
							(vocabulary: IVocabulary, idx: number) => (
								<Paper radius={10} p={20} withBorder key={idx}>
									<Flex gap={15}>
										{' '}
										<Title c={'violet'} order={3}>
											Word: {vocabulary?.word}{' '}
										</Title>{' '}
										<ActionIcon size={'lg'} variant='filled' color='violet'>
											<IconVolume2 size={30} />
										</ActionIcon>
									</Flex>
									<Text size={'lg'} my={5} fw={500}>
										Meaning: {vocabulary?.meaning}
									</Text>
									<Text size={'lg'} my={5} fw={500}>
										Pronunciation: {vocabulary?.pronunciation}
									</Text>
									<Text size={'lg'} my={5} fw={500}>
										When to say: {vocabulary?.whenToSay}
									</Text>
									<Text size={'lg'} my={5} fw={500}>
										Admin: {vocabulary?.adminEmail}
									</Text>

									<Group position='right'>
										<Button
											variant='outline'
											onClick={() => {
												setPage(page - 1);
											}}
											disabled={page === 1}
										>
											<IconArrowLeft size={20} />
										</Button>
										<Button
											onClick={() => {
												setPage(page + 1);
											}}
											disabled={!vocabulariesData?.hasNext}
										>
											<IconArrowRight size={20} />
										</Button>
										{!vocabulariesData?.hasNext && (
											<Button
												onClick={() => onComplete()}
												disabled={vocabulariesData?.hasNext}
												color='teal'
											>
												Complete
											</Button>
										)}
									</Group>
								</Paper>
							)
						)}
					</>
				)}

				{showConfetti && (
					<Confetti
						className='mx-auto'
						width={(width / 100) * 95}
						height={height}
					/>
				)}
			</Container>
		</ClientAppLayout>
	);
};

export default UserProtectorWithSession(SingleLesson);
