import gql from 'graphql-tag';

export const GET_FD_MATCHES = gql`
  query FootballDataMatches($competitionId: Int!) {
    fd_matches(competitionId: $competitionId) {
      count
      matches {
        id
        matchday
        status
        utcDate
        homeTeam {
          id
          name
        }
        awayTeam {
          id
          name
        }
        score {
          winner
          duration
        }
      }
    }
  }
`;
