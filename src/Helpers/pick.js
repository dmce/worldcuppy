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
    this._inPlayPoints(outcome);
  }

  _inPlayPoints(outcome) {
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

  add() {
    return api.add('picks', this);
  }

  delete() {
    return api.delete('picks', this);
  }

  static processPicks(data) {
    let picks = [];
    data.picks.forEach((u, i) => {
      picks.push(
        new Pick(
          u._id,
          u.fixtureId,
          u.outcome,
          u.gameday,
          u.points,
          u.resolved,
          u.user,
          u.username
        )
      );
    });
    return picks;
  }

  static async get(Id) {
    const data = await api.get('picks', Id);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.processPicks(JSON.parse(data)));
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getByUser() {
    const data = await api.getByUser('picks/user');
    return new Promise((resolve, reject) => {
      try {
        resolve(this.processPicks(JSON.parse(data)));
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getByFixtureId(Id) {
    const data = await api.get('picks/fixture', Id);
    return new Promise((resolve, reject) => {
      try {
        resolve(this.processPicks(JSON.parse(data)));
      } catch (error) {
        reject(error);
      }
    });
  }
}
