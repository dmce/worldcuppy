import gql from 'graphql-tag';

export const GET_FILTERED_COMPETITIONS = gql`
  query Competitions($apiId: Int!) {
    competitions(where: { apiId: $apiId }) {
      id
      apiId
      name
      seasons {
        id
        apiId
        startDate
        endDate
        currentMatchday
      }
    }
  }
`;
