import gql from 'graphql-tag';

export const GET_COMPETITIONS = gql`
  query Competitions($apiId: Int!) {
    competitions(where: { apiId: $apiId }) {
      id
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
