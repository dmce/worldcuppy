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

export const GET_COMPETITIONS = gql`
  query Competitions {
    competitions {
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

export const CREATE_COMPETITION = gql`
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

export const UPSERT_COMPETITION = gql`
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
