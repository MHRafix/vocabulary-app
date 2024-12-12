import { Container, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';

const ClientFooter: React.FC<{}> = () => {
	const { asPath } = useRouter();
	const isSticky = asPath.split('/')[1] === 'tour-packages';

	return (
		<footer
			className={
				isSticky
					? `mt-16 bg-[#070F24] pt-10 pb-5 mb-16`
					: `mt-16 bg-[#070F24] pt-10 pb-5`
			}
		>
			<Container size='lg' p='sm'>
				<div className='grid lg:grid-cols-4 text-white gap-y-5'>
					<div>
						<Text fz={25} fw={700} color='teal'>
							Vocabulary App
						</Text>
					</div>
				</div>
			</Container>
		</footer>
	);
};

export default ClientFooter;
