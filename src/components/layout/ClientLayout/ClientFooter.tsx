import { Container, Text } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const ClientFooter: React.FC<{}> = () => {
	const { asPath } = useRouter();
	const isSticky = asPath.split('/')[1] === 'tour-packages';

	return (
		<footer className={` bg-[#070F24] pt-10 pb-5`}>
			<Container size='lg' p='sm'>
				<div className='text-center text-white gap-y-5'>
					<Image
						src={'/assets/Logo/logo.png'}
						alt='Logo'
						width={250}
						height={120}
						className='!mx-auto !h-[120px]'
					/>
					<Text fz={25} fw={700} color='violet'>
						Vocabulary App
					</Text>
					<Text fz={17} fw={700} color='violet'>
						Vocabulary Learning Application for Japanese
					</Text>
				</div>
			</Container>
		</footer>
	);
};

export default ClientFooter;
