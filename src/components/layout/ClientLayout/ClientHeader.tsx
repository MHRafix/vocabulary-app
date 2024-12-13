import { useGetSession } from '@/app/config/logic/getSession';
import { Flex } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import UserMenuAndSignInBtn from './UserMenuAndSignInBtn';

const navData = [
	{
		label: 'Lessons',
		link: '/lessons',
	},
	{
		label: 'Tutorials',
		link: '/tutorials',
	},
];

export const ClientHeader: React.FC<{}> = ({}) => {
	const { user } = useGetSession();
	const [opened, setOpened] = useState(false);

	const [isOpenNav, setIsOpenNav] = useState(false);

	const { pathname } = useRouter();

	return (
		<nav className='py-2'>
			<div className='wrapper'>
				<div className='navbar-wrapper px-9 mx-auto h-[90px] flex justify-between items-center rounded-[10px] '>
					<Flex align='center' gap={10}>
						<Image
							src={'/assets/Logo/logo.png'}
							alt='Logo'
							width={250}
							height={90}
							className='!h-[80px]'
						/>
					</Flex>

					{/* ----------- Desktop Nav ---------- */}
					<div className='gap-10 hidden lg:flex justify-center items-center text__color'>
						{navData.map((item, i) => {
							return (
								// <Link
								// >
								<Link
									href={item.link}
									key={i}
									style={{
										fontFamily: 'Nunito sans, sans-serif',
										fontSize: 18,
									}}
									className={`text-lg  pb-2  ${
										pathname === item?.link
											? 'text-green-500 duration-300 border-b-[2px] border-solid border-b-green-500'
											: 'hover:border-b-[2px] hover:text-green-500 hover:duration-300 hover:border-solid hover:border-b-green-500'
									}`}
								>
									{item?.label}
								</Link>
							);
						})}
						<UserMenuAndSignInBtn user={user!} />
					</div>

					{/* ----------- Mobile Nav ---------- */}
					<div className='block lg:hidden'>
						<button
							onClick={() => setIsOpenNav(true)}
							className='nav-menu__btn'
						>
							<svg
								width='22'
								height='16'
								viewBox='0 0 22 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M1.85705 1.90479L20.1428 1.90479M1.854 8.00002L20.1351 8.00002M1.85705 14.0953L20.1351 14.0953'
									stroke='white'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div
				className={`${
					isOpenNav ? 'translate-0 ' : 'translate-x-[200vw]'
				} left-0 fixed h-screen w-screen flex lg:hidden justify-end top-0 transition duration-200 ease-in-out z-50`}
			>
				<div
					onClick={() => setIsOpenNav(false)}
					className='w-1/5 md:w-2/5 bg-[#06060680]'
				></div>
				<div className='mobile-nav__sidebar w-4/5 md:w-3/5 h-full py-10 bg-black !z-[99999999px]'>
					<div className='text-right px-10'>
						<button onClick={() => setIsOpenNav(false)}>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M24.4444 -4L-0.444444 -4C-1.38744 -4 -2.29181 -3.6254 -2.9586 -2.9586C-3.6254 -2.29181 -4 -1.38744 -4 -0.444444L-4 24.4444C-4 25.3874 -3.6254 26.2918 -2.9586 26.9586C-2.29181 27.6254 -1.38744 28 -0.444444 28L24.4444 28C25.3874 28 26.2918 27.6254 26.9586 26.9586C27.6254 26.2918 28 25.3874 28 24.4444L28 -0.444444C28 -1.38744 27.6254 -2.29181 26.9586 -2.9586C26.2918 -3.6254 25.3874 -4 24.4444 -4ZM24.4444 24.4444L-0.444444 24.4444L-0.444444 -0.444444L24.4444 -0.444444L24.4444 24.4444ZM20.8889 5.6L14.4889 12L20.8889 18.4L18.4 20.8889L12 14.4889L5.6 20.8889L3.11111 18.4L9.51111 12L3.11111 5.6L5.6 3.11111L12 9.51111L18.4 3.11111L20.8889 5.6Z'
									fill='white'
								/>
							</svg>
						</button>
					</div>

					<div className='pb-36'>
						<ul className='text-left px-10 pt-10'>
							{navData.map((item, i) => {
								return (
									<li key={i} className='py-2 text-white'>
										<Link
											href={item.link}
											key={i}
											style={{
												fontFamily: 'Nunito sans, sans-serif',
												fontSize: 18,
											}}
											className={`text-lg my-5 pb-2  ${
												pathname === item?.link
													? 'text-green-500 duration-300 border-b-[2px] border-solid border-b-green-500'
													: 'hover:border-b-[2px] hover:text-green-500 hover:duration-300 hover:border-solid hover:border-b-green-500'
											}`}
										>
											{item.label}
										</Link>
									</li>
								);
							})}
						</ul>
						<UserMenuAndSignInBtn user={user!} />
					</div>
				</div>
			</div>
		</nav>
	);
};

// export default ClientHeader;
