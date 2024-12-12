import { gql } from '@apollo/client';

export const GET_NEWS_QUERY = gql`
	query {
		allNews(input: { page: 1, limit: 6 }) {
			nodes {
				_id
				title
				category
				publishedAt
				videoUrl
			}
		}
	}
`;

export const GET_SINGLE_NEWS_QUERY = gql`
	query GET_SINGLE_NEWS($newsId: String) {
		news(input: { key: "_id", operator: eq, value: $newsId }) {
			_id
			title
			category
			videoUrl
			publishedAt
		}
	}
`;

export const GET_RELATED_NEWS_QUERY = gql`
	query GET_RELATED_NEWS($category: String, $currentNewsId: String) {
		allNews(
			input: {
				page: 1
				limit: 6
				where: [
					{ key: "category", operator: eq, value: $category }
					{ key: "_id", operator: ne, value: $currentNewsId }
				]
			}
		) {
			nodes {
				_id
				title
				category
				publishedAt
				videoUrl
			}
		}
	}
`;
