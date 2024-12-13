import UserProtectorWithSession from '@/app/config/authProtection/userProtectorWithSession';
import ClientAppLayout from '@/components/layout/ClientLayout/ClientAppLayout';
import { Container, Paper, Space, Text, Title } from '@mantine/core';
import { NextPage } from 'next';

const TutorialsPage: NextPage = () => {
	return (
		<ClientAppLayout title='Tutorials'>
			<Container size={'lg'}>
				<Space h={50} />
				<Title order={2}>Essential Tutorials</Title>
				<Space h={20} />
				<div className='grid md:grid-cols-2 gap-5 relative overflow-hidden'>
					{tutorials?.map((tutorial, idx: number) => (
						<Paper
							className='cursor-pointer hover:bg-slate-100 hover:duration-300'
							radius={10}
							key={idx}
						>
							<iframe
								width='100%'
								height='315'
								src={tutorial?.src}
								title='YouTube video player'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
								className='rounded-t-md'
							></iframe>

							<Text p={20} fz={20} fw={700}>
								{tutorial?.title}
							</Text>
						</Paper>
					))}
				</div>
				<Space h={50} />
			</Container>
		</ClientAppLayout>
	);
};

export default UserProtectorWithSession(TutorialsPage);

const tutorials = [
	{
		title:
			'Number System (0-9) | Japanese Language in Bangla (জাপানি ভাষা শিক্ষা)',
		src: 'https://www.youtube.com/embed/12VQYnuIgrM?si=5YNkNUSjUXa2Ahlv',
	},
	{
		title:
			'Number System (10-19) | Japanese Language in Bangla (জাপানি ভাষা শিক্ষা)',
		src: 'https://www.youtube.com/embed/4zfXQc921to?si=DhzFXr5yy4z7eiNL',
	},
	{
		title:
			'Number System (21-29) | Japanese Language in Bangla (জাপানি ভাষা শিক্ষা)',
		src: 'https://www.youtube.com/embed/k-OTYdsLgCk?si=7muGs9f0Xd2t6_kv',
	},
	{
		title:
			'Number System (31-39) | Japanese Language in Bangla (জাপানি ভাষা শিক্ষা)',
		src: 'https://www.youtube.com/embed/7NxQafrDS8s?si=L34JvnDiwQXtdb1B',
	},
	{
		title:
			'Number System (41-49) | Japanese Language in Bangla (জাপানি ভাষা শিক্ষা)',
		src: 'https://www.youtube.com/embed/1K196d_Xw3Q?si=bUPSqcK5uhurxfIr',
	},
	{
		title:
			'Number System (51-59) | Japanese Language in Bangla (জাপানি ভাষা শিক্ষা)',
		src: 'https://www.youtube.com/embed/BnQR98XwGAg?si=3ZGwCcPXXPkMHElj',
	},
	{
		title:
			'Number System (61-69) | Japanese Language in Bangla (জাপানি ভাষা শিক্ষা)',
		src: 'https://www.youtube.com/embed/yoRq8iMHqTU?si=iRXmWTeNtB_nG3Lo',
	},
	{
		title:
			'Number System (71-79) | Japanese Language in Bangla (জাপানি ভাষা শিক্ষা)',
		src: 'https://www.youtube.com/embed/yoRq8iMHqTU?si=FBEoKdolD2Yj82Fc',
	},
	{
		title:
			'Number System (81-89) | Japanese Language in Bangla (জাপানি ভাষা শিক্ষা)',
		src: 'https://www.youtube.com/embed/hIjuDiPtVVs?si=aGHQosbXdl9FNiwJ',
	},
	{
		title:
			'Number System (91-99) | Japanese Language in Bangla (জাপানি ভাষা শিক্ষা)',
		src: 'https://www.youtube.com/embed/4zfXQc921to?si=xWsEukRpIzu3Sw9g',
	},
];
