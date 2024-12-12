import { gql } from '@apollo/client';

export const Get__Articles__Query = gql`
	query Blogs($input: BlogListQueryDto) {
		Blogs(input: $input) {
			nodes {
				_id
				author {
					_id
					name
					avatar
				}
				like
				title
				description
				createdAt
			}
		}
	}
`;

export const Get__Article__Query = gql`
	query Get_Blog($input: CommonMatchInput!) {
		Blog(input: $input) {
			_id
			author {
				_id
				name
				avatar
			}
			like
			title
			description
			image
			cover
			status
			updatedAt
			createdAt
		}
	}
`;
