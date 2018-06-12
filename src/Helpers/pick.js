import { default as api } from '../Services/api';

export default class Pick {
  constructor(
    id,
    fixtureId,
    outcome,
    gameday,
    points = 0,
    resolved = false,
    user = localStorage.getItem('sub'),
    username = localStorage.getItem('name')
  ) {
    this.Id = id;
    this.fixtureId = fixtureId;
    this.outcome = outcome;
    this.gameday = gameday;
    this.user = user;
    this.username = username;
    this.resolved = resolved;
    this.points = points;
  }

  inPlayPoints(outcome) {
    if (!this.resolved) {
      switch (outcome) {
        case 'd':
          this.points = 1;
          break;
        case this.outcome:
          this.points = 3;
          break;
        default:
          this.points = 0;
          break;
      }
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
