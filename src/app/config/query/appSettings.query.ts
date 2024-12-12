import { gql } from "@apollo/client";

export const APP_SETTINGS_QUERY = gql`
  query {
    appSettings(input: { page: 1, limit: 1 }) {
      nodes {
        _id
        logo
        visaCategories
        countriesVisa {
          country
          visaCategory
        }
        branches {
          branchName
          email
          phone
          address
        }
      }
    }
  }
`;
