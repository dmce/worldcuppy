import format from 'date-fns/format';
import { default as footballDataApi } from '../Services/football-data-api';

export default class Fixture {
  constructor(homeTeam, awayTeam, status, date, matchDay, link) {
    this.homeTeamName = homeTeam;
    this.awayTeamName = awayTeam;
    this.status = status;
    this.date = format(date, 'ddd Do MMMM');
    this.kickOff = format(date, 'HH:mm');
    this.matchDay = matchDay;
    this.Id = parseInt(/[^/]*$/.exec(link)[0], 10);
    this.gameday = parseInt(format(date, 'DDD'), 10) - 164;
    this.outcome = {};
  }

  goals(homeGoals, awayGoals) {
    this.outcome.homeGoals = homeGoals;
    this.outcome.awayGoals = awayGoals;
    this.outcome.result =
      homeGoals > awayGoals
        ? this.homeTeamName
        : homeGoals < awayGoals
          ? this.awayTeamName
          : 'd';
  }

  static getAll(competition) {
    return footballDataApi.getFixtures(competition);
  }
}
