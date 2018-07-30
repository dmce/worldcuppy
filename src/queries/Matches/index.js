import gql from 'graphql-tag';

export const GET_MATCHES = gql`
  query Matches($apiId: Int!) {
    matches(where: { apiId: $apiId }) {
      id
      apiId
      utcDate
      homeTeam {
        id
        name
      }
      awayTeam {
        id
        name
      }
      duration
      winner
    }
  }
`;
