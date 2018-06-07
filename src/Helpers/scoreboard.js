import { default as api } from '../Services/api';

export default class Scoreboard {
  constructor(user, username, points, picks) {
    this.user = user;
    this.username = username;
    this.points = points;
    this.picks = picks;
  }

  static get(Id) {
    return api.get('scoreboard', Id);
  }
}
