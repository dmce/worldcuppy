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

  static processFixtures = data => {
    let activeGameday = 0;

    let fixtures = [];

    data.fixtures.forEach((f, i) => {
      const fixture = new Fixture(
        f.homeTeamName,
        f.awayTeamName,
        f.status,
        f.date,
        f.matchday,
        f._links.self.href
      );

      // TODO: REMOVE THIS
      // if (i === 0) {
      //   fixture.status = 'FINISHED';
      //   fixture.goals(4, 3);
      // }

      // if (i === 1) {
      //   fixture.status = 'IN_PLAY';
      //   fixture.goals(1, 0);
      // }

      // if (i === 2) {
      //   fixture.status = 'IN_PLAY';
      //   fixture.goals(0, 3);
      // }

      // TODO: END

      if (fixture.status === 'IN_PLAY') activeGameday = fixture.gameday;
      if (fixture.gameday === activeGameday && fixture.status === 'TIMED')
        fixture.status = 'GAMEDAY_ACTIVE';

      switch (fixture.status) {
        case 'FINISHED':
          fixture.goals(f.result.goalsHomeTeam, f.result.goalsAwayTeam);
          fixtures.push(fixture);
          break;
        case 'IN_PLAY':
        case 'GAMEDAY_ACTIVE':
        case 'GAMEDAY_FINISHED':
          fixture.goals(f.result.goalsHomeTeam, f.result.goalsAwayTeam);
          fixtures.push(fixture);
          break;
        case 'TIMED':
          fixtures.push(fixture);
          break;
        default:
          fixtures.push(fixture);
          break;
      }
    });

    return fixtures;
  };

  static async getAll(competition) {
    const data = await footballDataApi.getFixtures(competition);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.processFixtures(data));
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getToday(competition) {
    const data = await footballDataApi.getFixtures(
      competition,
      '?timeFrame=n1'
    );
    return new Promise((resolve, reject) => {
      try {
        resolve(this.processFixtures(data));
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getScheduled(competition, filterDays = 1) {
    const tomorrow = startOfTomorrow();
    const startFilter = format(tomorrow, 'YYYY-MM-dd');
    const endFilter = addDays(tomorrow, filterDays);
    const data = await footballDataApi.getFixtures(
      competition,
      `?timeFrameStart=${startFilter}&timeFrameEnd=${endFilter}`
    );
    return new Promise((resolve, reject) => {
      try {
        resolve(this.processFixtures(data));
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getFinished(competition, filterDays = 1) {
    const yesterday = startOfYesterday();
    const endFilter = format(yesterday, 'YYYY-MM-dd');
    const startFilter = subDays(yesterday, filterDays);
    const data = await footballDataApi.getFixtures(
      competition,
      `?timeFrameStart=${startFilter}&timeFrameEnd=${endFilter}`
    );
    return new Promise((resolve, reject) => {
      try {
        resolve(this.processFixtures(data));
      } catch (error) {
        reject(error);
      }
    });
  }
}
