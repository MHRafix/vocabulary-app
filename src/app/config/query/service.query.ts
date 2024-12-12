import { gql } from '@apollo/client';

export const GET_SERVICE_QUERY = gql`
	query GET_SERVICE_QUERY($page: Int!, $limit: Int) {
		services(input: { page: $page, limit: $limit }) {
			nodes {
				_id
				title
				shortDesc
				desc
				preRequirements
				price
			}
		}
	}
`;

export const GET_SINGLE_SERVICE_QUERY = gql`
	query GET_SINGLE_SERVICE_QUERY($id: String!) {
		service(input: { key: "_id", operator: eq, value: $id }) {
			_id
			title
			desc
			preRequirements
			price
			thumbnail
			banner
		}
	}
`;

// export
// meta {
// 	totalCount
// 	currentPage
// 	hasNextPage
// 	totalPages
// }
