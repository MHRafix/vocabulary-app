import protectWithoutSession from '@/app/config/authProtection/potectWithoutSession';

import authenticationApiRepository from '@/app/api/repositories/user.repo';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Flex, Input, PasswordInput, Title } from '@mantine/core/';
import { showNotification } from '@mantine/notifications';
import {
	IconCheck,
	IconLock,
	IconMail,
	IconUserPlus,
	IconX,
} from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { IAuthPayload } from './register';

const LoginPage: NextPage = () => {
	const router = useRouter();

	// login form
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: { email: '', password: '' },
		resolver: yupResolver(Login_Form_Validation_Schema),
	});

	// execute after success
	const onSuccess = (res: { token: string; _id: string }) => {
		Cookies.set('user', JSON.stringify(res), {
			expires: 5,
			sameSite: 'strict',
		});
		if (router?.query?.callback) {
			router?.push(router?.query?.callback as string);
		} else {
			router?.push('/');
		}
	};

	// login mutation
	const { mutate, isPending } = useMutation({
		mutationKey: ['Login_Mutation'],
		mutationFn: (payload: IAuthPayload) =>
			authenticationApiRepository.userLogin(payload),
		onSuccess(res) {
			showNotification({
				title: 'Login successful.',
				color: 'teal',
				icon: <IconCheck size={16} />,
				message: '',
			});
			onSuccess(res?.data);
		},
		onError(error) {
			showNotification({
				title: 'Failed to login.',
				color: 'red',
				icon: <IconX size={16} />,
				message: error?.message,
			});
		},
	});

	// handle form submission
	const handleLogin = async (payload: IAuthPayload) => {
		mutate(payload);
	};

	return (
		<Flex justify='center' align='center' h='100vh'>
			<Box className='xs:w-11/12 lg:w-5/12 bg-white  p-5 drop-shadow-xl rounded-md'>
				<Title order={2} mb={10} ff={'Nunito sans, sans-serif'}>
					Login Now
				</Title>
				<form onSubmit={handleSubmit(handleLogin)}>
					<Input.Wrapper
						label='Email'
						my={10}
						error={<ErrorMessage errors={errors} name='email' />}
					>
						<Input
							disabled={isPending}
							{...register('email')}
							icon={<IconMail size={20} />}
							placeholder='Your email'
							size='md'
							variant='filled'
							style={{
								fontFamily: 'Nunito sans, sans-serif !important',
							}}
						/>
					</Input.Wrapper>
					<Input.Wrapper
						label='Password'
						my={10}
						error={<ErrorMessage errors={errors} name='password' />}
					>
						<PasswordInput
							disabled={isPending}
							{...register('password')}
							icon={<IconLock size={20} />}
							placeholder='**** ****'
							size='md'
							variant='filled'
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
						Login now
					</Button>
				</form>
				<div className='text-right mt-3'>
					<Link href='/auth/register'>
						<Button color='violet' rightIcon={<IconUserPlus size={18} />}>
							Register now
						</Button>
					</Link>
				</div>
			</Box>
		</Flex>
	);
};

export default protectWithoutSession(LoginPage);

export const Login_Form_Validation_Schema = Yup.object().shape({
	email: Yup.string().email().required().label('Email'),
	password: Yup.string().required().min(8).max(20).label('Password'),
});
