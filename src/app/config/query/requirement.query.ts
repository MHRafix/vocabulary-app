import { gql } from '@apollo/client';

export const GET_VISA_REQUIREMENT_QUERY = gql`
	query Requirements($input: VisaReqListQueryDto) {
		VisaRequirements(input: $input) {
			nodes {
				_id
				status
				title
				description
				destinationCountry
				image
				cover
				visaType
				createdAt
				updatedAt
				author {
					name
					avatar
				}
			}
		}
	}
`;
