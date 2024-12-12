import { Container, Flex, Text } from '@mantine/core';
import { IconLocation, IconMail, IconPhone } from '@tabler/icons-react';
import Link from 'next/link';
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
						{/* <Image src={Logo} alt='logo' width={70} height={70} /> */}
						<Text fz={25} fw={700} color='teal'>
							Vocabulary App
						</Text>
					</div>
					<div>
						<Text color='#4E576C' size='sm' fw={600} mb={12}>
							Our Businesses
						</Text>
						<Text size='sm' color='#999' my={8}>
							<Link href={'https://www.facebook.com/famousfashion.com.bd'}>
								Famous Fashion
							</Link>
						</Text>
						<Text size='sm' color='#999' my={8}>
							<Link href={'/'}>Asia Adventure Limited</Link>
						</Text>
					</div>
					<div>
						<Text color='#4E576C' size='sm' fw={600} mb={12}>
							Pages
						</Text>
						<Text size='sm' color='#999' my={8}>
							<Link href={'/'}>Home</Link>
						</Text>
						<Text size='sm' color='#999' my={8}>
							<Link href={'/about_us'}>About us</Link>
						</Text>
						<Text size='sm' color='#999' my={8}>
							<Link href={'/trips'}>Trips</Link>
						</Text>
						<Text size='sm' color='#999' my={8}>
							<Link href={'/explore'}>Explore</Link>
						</Text>
						<Text size='sm' color='#999' my={8}>
							<Link href={'/contact_us'}>Contact Us</Link>
						</Text>
					</div>
					<div>
						<Text color='#4E576C' size='sm' fw={600} mb={12}>
							Our Info
						</Text>

						<Flex gap={8} align='center'>
							<IconMail color='#D6336C' size={20} opacity={1} />
							<Text size='sm' color='#999' my={8}>
								example@gmail.com
							</Text>
						</Flex>
						<Flex gap={8} align='center'>
							<IconPhone color='#7950F2' size={20} opacity={1} />
							<Text size='sm' color='#999' my={8}>
								+880 1726631567
							</Text>
						</Flex>
						<Flex gap={8} align='center'>
							<IconLocation color='#15AABF' size={20} opacity={1} />
							<Text size='sm' color='#999' my={8}>
								Basundhara, Shop - #102
							</Text>
						</Flex>
					</div>
				</div>
			</Container>
		</footer>
	);
};

export default ClientFooter;
