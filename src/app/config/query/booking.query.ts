import { gql } from "@apollo/client";

export const PACKAGE_BOOKING = gql`
  mutation CREATE_BOOKING(
    $customerDetails: CustomerDetailsInput!
    $travelerDetails: TravelerDetailsInput!
    $packageId: String!
    $transactionId: String!
    $bookingId: String!
    $status: BOOKING_STATUS
    $paymentDetails: PaymentDetailsInput!
  ) {
    createBooking(
      input: {
        customerDetails: $customerDetails
        packageId: $packageId
        transactionId: $transactionId
        bookingId: $bookingId
        status: $status
        travelerDetails: $travelerDetails
        paymentDetails: $paymentDetails
      }
    ) {
      _id
      bookingId
    }
  }
`;
