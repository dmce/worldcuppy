import gql from 'graphql-tag';

export const GET_MATCHES = gql`
  query Matches($apiId: Int!) {
    matches(where: { apiId: $apiId }) {
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
