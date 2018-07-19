import gql from 'graphql-tag';

export const GET_COMPETITION = gql`
  query Competition($apiId: Int!) {
    competition(where: { apiId: $apiId }) {
      id
      apiId
      name
      seasons {
        id
        apiId
        startDate
        endDate
        currentMatchday
        matches {
          id
        }
      }
    }
  }
`;
