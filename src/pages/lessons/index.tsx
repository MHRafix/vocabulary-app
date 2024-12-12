import { ILesson } from '@/app/api/model/lesson.model';
import lessonApiRepository from '@/app/api/repositories/lesson.repo';
import UserProtectorWithSession from '@/app/config/authProtection/userProtectorWithSession';
import EmptyPanel from '@/components/common/EmptyPanels/EmptyPanel';
import ClientAppLayout from '@/components/layout/ClientLayout/ClientAppLayout';
import { Container, Paper, Skeleton, Space, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import Link from 'next/link';

const LessonsPage: NextPage = () => {
	// get all lessons
	const {
		data,
		isLoading,
		refetch: onRefetch,
		isRefetching,
	} = useQuery({
		queryKey: ['learner_lessons'],
		queryFn: async () => await lessonApiRepository.getLessons(),
	});

	return (
		<ClientAppLayout>
			<Container size={'lg'}>
				<Space h={50} />
				<Title order={2}>My Lessons</Title>
				<Space h={20} />
				<div className='grid lg:grid-cols-3 gap-5'>
					{data?.map((lesson: ILesson, idx: number) => (
						<Link href={`/lessons/${lesson?._id}`}>
							<Paper
								className='cursor-pointer hover:bg-slate-100 hover:duration-300'
								p={20}
								radius={10}
								key={idx}
								withBorder
								tt={'capitalize'}
							>
								<Text
									fz={25}
									fw={500}
								>{`${lesson?.title} - ${lesson?.number}`}</Text>
							</Paper>
						</Link>
					))}
				</div>
				<>
					{isLoading ? (
						<div className='grid lg:grid-cols-3 gap-5'>
							{new Array(15).fill(15).map((_, idx: number) => (
								<Skeleton radius={10} p={20} h={80} key={idx} />
							))}
						</div>
					) : (
						<EmptyPanel
							title='No lesson available.'
							imgPath='/assets/emptyPanel/lesson.png'
							isShow={!Boolean(data?.length)}
						/>
					)}
				</>
			</Container>
		</ClientAppLayout>
	);
};

export default UserProtectorWithSession(LessonsPage);
