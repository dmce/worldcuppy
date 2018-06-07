import { default as api } from '../Services/api';

export default class Pick {
  constructor(id, fixtureId, outcome, gameday) {
    this.Id = id;
    this.fixtureId = fixtureId;
    this.outcome = outcome;
    this.gameday = gameday;
    this.user = localStorage.getItem('sub');
    this.username = localStorage.getItem('name');
    this.points = 0;
    this.resolved = false;
  }

  inPlayPoints(winningTeam) {
    switch (winningTeam) {
      case 'd':
        return 1;
      case this.outcome:
        return 3;
      default:
        return 0;
    }
  }

  static add(body) {
    return api.add('picks', body);
  }

  static delete(Id) {
    return api.delete('picks', Id);
  }

  static get(Id) {
    return api.get('picks', Id);
  }

  static getByUser() {
    return api.getByUser('picks/user');
  }

  static getByFixtureId(Id) {
    return api.get('picks/fixture', Id);
  }
}
