import gql from 'graphql-tag';

export const GET_SEASON = gql`
  query Season($apiId: Int!) {
    season(where: { apiId: $apiId }) {
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
`;

export const GET_SEASONS = gql`
  query Seasons($apiId: Int!) {
    seasons(where: { apiId: $apiId }) {
      id
      apiId
      startDate
      endDate
      currentMatchday
    }
  }
`;

export const CREATE_SEASON = gql`
  mutation Competition($data: CompetitionCreateInput!) {
    createCompetition(data: $data) {
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

export const UPDATE_SEASON = gql`
  mutation Competition(
    $data: CompetitionUpdateInput!
    $where: CompetitionWhereUniqueInput!
  ) {
    updateCompetition(data: $data, where: $where) {
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

export const UPSERT_SEASON = gql`
  mutation Competition(
    $where: CompetitionWhereUniqueInput!
    $create: CompetitionCreateInput!
    $update: CompetitionUpdateInput!
  ) {
    upsertCompetition(where: $where, create: $create, update: $update) {
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
