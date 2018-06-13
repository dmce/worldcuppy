import { default as api } from '../Services/api';

export default class Scoreboard {
  constructor(user, username, points, totalPicks, finishedPicks) {
    this.user = user;
    this.username = username;
    this.points = points;
    this.totalPicks = totalPicks;
    this.finishedPicks = finishedPicks;
  }

  static get(Id) {
    return api.get('scoreboard', Id);
  }
}
