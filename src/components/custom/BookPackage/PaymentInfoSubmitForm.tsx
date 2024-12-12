import { Notify } from '@/app/config/alertNotifications/alert.notifications';
import { generateUid } from '@/app/config/logic/generateUid';
import { getPackageCalculatedPriceWithFormat } from '@/app/config/logic/getPackageCalcuulatedPrice';
import { getStyle } from '@/app/config/logic/getSelectInputStyle';
import { PACKAGE_BOOKING } from '@/app/config/query/booking.query';
import {
	BOOKING_STATUS,
	PAYMENT_STATUS,
	bookingId,
	customerInfoAtom,
	paymentDetailsAtom,
	stepController,
	travelerInfoAtom,
} from '@/store/bookingForm.store';
import { useMutation } from '@apollo/client';
import { Button, Divider, Input, Select, Space, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import Router from 'next/router';
import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
	image: string;
	label: string;
	description: string;
}

// const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
//   ({ image, label, ...others }: ItemProps, ref) => (
//     <div ref={ref} {...others}>
//       <Group noWrap>
//         <Avatar src={image} size={"sm"} />

//         <div>
//           <Text size="sm">{label}</Text>
//         </div>
//       </Group>
//     </div>
//   )
// );

const PaymentInfoSubmitForm: React.FC<{ availablePrice: number }> = ({
	availablePrice,
}) => {
	const [step, onChangeActiveStep] = useAtom(stepController);
	const [paymentDetails, onChangePaymentDetails] = useAtom(paymentDetailsAtom);
	const [travelerDetails, onChangeTravelerDetails] = useAtom(travelerInfoAtom);
	const [customerDetails, onChangeCustomerDetails] = useAtom(customerInfoAtom);
	const [, setBookingID] = useAtom(bookingId);

	// call after success function
	const onSuccess = (res: any) => {
		setBookingID(res?.createBooking?.bookingId);
		onChangeCustomerDetails(null);
		onChangeTravelerDetails({ adult: 1, child: 0 });
		onChangePaymentDetails(null);
		onChangeActiveStep({
			activeStep: 2,
		});
	};

	// booking mutaion here
	const [bookPackage, { loading: bookingPackage }] = useMutation(
		PACKAGE_BOOKING,
		Notify({
			sucTitle: 'Package successfully booked!',
			sucMessage: 'Track with booking id.',
			errMessage: 'Failed to book package!',
			action: onSuccess,
		})
	);
	// generateUid();
	const handleBookPackage = () => {
		bookPackage({
			variables: {
				customerDetails: {
					name: customerDetails?.name!,
					email: customerDetails?.email!,
					phone: customerDetails?.phone,
					address: customerDetails?.address,
				},
				travelerDetails: {
					adult: travelerDetails?.adult,
					child: travelerDetails?.child,
				},
				transactionId: paymentDetails?.transactionId,
				packageId: Router?.query?.id,
				bookingId: generateUid(),
				status: BOOKING_STATUS.PENDING,
				paymentDetails: {
					totalAmount: 234,
					paymentMethod: paymentDetails?.paymentMethod,

					paidFrom: paymentDetails?.paidFrom,
					paymentStatus: PAYMENT_STATUS.IN_REVIEW_PAID,
					paymentDateTime: new Date(),
				},
			},
		});
	};
	return (
		<div>
			{' '}
			<div className='flex justify-between items-center '>
				<Text mb={3} fz={16}>
					Payment information
				</Text>
				<Text mb={3} fz={16}>
					৳{' '}
					{getPackageCalculatedPriceWithFormat(
						travelerDetails?.adult!,
						travelerDetails?.child!,
						availablePrice
					)}
				</Text>
			</div>
			<Divider h='sm' />
			<Space h='xs' />
			<div>
				<Input.Wrapper
					label={
						<Text ff='Nunito Sans, sans-serif' fw={700}>
							Select payment method
						</Text>
					}
					size='sm'
					// error={<ErrorMessage errors={errors} name='email' />}
				>
					<Select
						disabled={bookingPackage}
						onChange={(METHOD) =>
							onChangePaymentDetails({
								...paymentDetails,
								paymentMethod: METHOD!,
							})
						}
						defaultValue={paymentDetails?.paymentMethod}
						placeholder='Pick one'
						// itemComponent={SelectItem}
						data={data}
						variant='filled'
						id='removeDefaultBorder'
						styles={() => getStyle('#12B584')}
						size='md'
					/>
				</Input.Wrapper>
				<Space h={'xs'} />
				<Input.Wrapper
					label={
						<Text ff='Nunito Sans, sans-serif' fw={700}>
							Transfer from
						</Text>
					}
					size='sm'
					// error={<ErrorMessage errors={errors} name='email' />}
				>
					<PhoneInput
						disabled={bookingPackage}
						onChange={(number) =>
							onChangePaymentDetails({
								...paymentDetails,
								paidFrom: number!,
							})
						}
						value={paymentDetails?.paidFrom}
						id='book_pacakge_phone_input'
						international
						defaultCountry='BD'
					/>
				</Input.Wrapper>
				<Space h={'xs'} />
				<Input.Wrapper
					label={
						<Text ff='Nunito Sans, sans-serif' fw={700}>
							Transaction Id
						</Text>
					}
					size='sm'
					// error={<ErrorMessage errors={errors} name='email' />}
				>
					<Input
						disabled={bookingPackage}
						onChange={(id) =>
							onChangePaymentDetails({
								...paymentDetails,
								transactionId: id.target?.value!,
							})
						}
						defaultValue={paymentDetails?.transactionId}
						variant='filled'
						id='removeDefaultBorder'
						placeholder='Transaction id'
						size='md'
					/>
				</Input.Wrapper>
				<Space h={'xs'} />
				<Button
					loading={bookingPackage}
					disabled={
						!paymentDetails?.paymentMethod ||
						!paymentDetails?.paidFrom ||
						!paymentDetails?.transactionId
					}
					// type='submit'
					fullWidth
					size='md'
					color='teal'
					ff='Nunito Sans, sans-serif'
					fw={700}
					fz={17}
					onClick={() => handleBookPackage()}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default PaymentInfoSubmitForm;

const data = [
	{
		image: 'https://i.ibb.co/MV4xMkt/download.jpg',
		label: 'BKASH',
		value: 'BKASH',
	},

	{
		image: 'https://i.ibb.co/yVFVZqD/download-1.jpg',
		label: 'ROCKET',
		value: 'ROCKET',
	},
	{
		image: 'https://i.ibb.co/M9WrrqV/download-2.jpg',
		label: 'NAGAD',
		value: 'NAGAD',
	},
];
