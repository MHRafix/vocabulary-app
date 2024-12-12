import { gql } from "@apollo/client";

export const BOOKING_APPOINTMENT = gql`
  mutation BOOK_APPOINTMENT(
    $name: String!
    $email: String!
    $phone: String!
    $serviceId: String!
    $subService: String!
    $profession: String!
    $clientQuestions: [ClientQuestionsInput!]
    $status: APPOINTMENT_STATUS!
  ) {
    createAppointment(
      input: {
        name: $name
        email: $email
        phone: $phone
        status: $status
        serviceId: $serviceId
        subService: $subService
        profession: $profession
        clientQuestions: $clientQuestions
      }
    ) {
      _id
    }
  }
`;
